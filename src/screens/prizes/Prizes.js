import { useEffect, useState, useCallback } from "react";
import { Text, View, TextInput, FlatList, Pressable, RefreshControl, ScrollView } from "react-native";
import Layout from "../Layout";
import styles from "./Prizes.styles";
import PrizesStarIcon from '../../assets/icons/PrizesStarIcon';
import SortCoins from '../../assets/icons/SortCoins';
import AscDscSortIcon from '../../assets/icons/AscDscSortIcon';
import FullVoucher from "../../components/FullVoucher";
import { get } from "../../utils/axios";
import NoVoucherIcon from '../../assets/icons/NoVoucherIcon';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText
} from "../../components/AppTexts";
import VoucherFilters from "../../components/VoucherFilters";

export default Prizes = () => {
    const [searchVal, setSearchVal] = useState("");  // State for search input
    const [currentTab, setCurrentTab] = useState("all");
    const [vouchers, setVouchers] = useState([]);
    const [currentCategory, setCurrentCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [noVouchers, setNoVouchers] = useState(false);

    const [popular, setPopular] = useState(true);
    const [coinsOnly, setCoinsOnly] = useState(true);
    const [priceOrder, setPriceOrder] = useState("cash");
    const [filterQuery, setFilterQuery] = useState("");
    const [queryParams, setQueryParams] = useState({ limit: 10 });
    const [refreshing, setRefreshing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isIntialLoad, setIsIntialLoad] = useState(true);
    const [scrollOffset, setScrollOffset] = useState(0);

    const [horizontalScrollPosition, setHorizontalScrollPosition] = useState(0);

    const searchChange = async (val) => {
        setSearchVal(val);  // Update the search value state
        try {
            var params = {
                ...queryParams,
                q: val
            }

            setQueryParams(params);

            if (val.length >= 3) {
                const queryString = new URLSearchParams(params).toString().replace(/\+/g, " ");

                let voucherResponse = await get(`vouchers/?${queryString}`);
                setScrollOffset(horizontalScrollPosition);
                setVouchers(voucherResponse?.results);
                setNoVouchers(voucherResponse?.results.length === 0);
            } else {
                getVouchers();
            }
        } catch (error) {
            console.log("err.messages.message: ", error.response.data.messages[0].message);
        }
    }

    const getVouchers = async () => {
        try {
            const queryString = new URLSearchParams(queryParams).toString().replace(/\+/g, " ");

            const voucherResponse = await get(`vouchers/?${queryString}`);
            setVouchers(voucherResponse?.results);
            setNoVouchers(voucherResponse?.results.length === 0);
            setIsIntialLoad(false);
        } catch (error) {
            console.log("err.messages.message: ", error.response.data.messages[0].message);
        }
    }

    const getMoreVouchers = async (info) => {
        if (isLoadingMore || isIntialLoad) return;

        try {
            setIsLoadingMore(true);
            const limit = (currentPage + 1) * 10;

            var params = {
                ...queryParams,
                limit: limit
            }

            setQueryParams(params);
            const queryString = new URLSearchParams(params).toString().replace(/\+/g, " ");;

            const voucherResponse = await get(`vouchers/?${queryString}`);
            setScrollOffset(horizontalScrollPosition);
            setCurrentPage(currentPage + 1);
            setVouchers(voucherResponse?.results);
            setNoVouchers(voucherResponse?.results.length === 0);
            setIsLoadingMore(false);

        } catch (error) {
            console.log("err.messages.message: ", error.response.data.messages[0].message);
        }
    }

    const getCategories = async () => {
        try {
            const categoriesRes = await get("voucher-categories/");
            setCategories(categoriesRes);
        } catch (error) {
            console.log("err.messages.message: ", error.response.data.messages[0].message);
        }
    }

    const changeTab = (tab) => {
        setScrollOffset(horizontalScrollPosition);
        renderSpecificCategoryItems(tab);
        setCurrentPage(1);
        setCurrentTab(tab);
        setCurrentCategory(tab);
    }

    const renderVoucherItem = ({ item, index }) => (
        <>
            {index === 0 &&
                (<Pressable onPress={() => changeTab("all")} style={{marginLeft: 16}}>
                    <View style={{ flex: item.id, backgroundColor: currentTab === "all" ? "#E53C6B" : "#fff", ...styles.filterTab }}>
                        <RegularText style={{ color: currentTab === "all" ? "#fff" : "#2E2B53", fontSize: 16 }}>All Services</RegularText>
                    </View>
                </Pressable>
                )}

            <Pressable onPress={() => changeTab(item.slug)} style={{marginRight: index === (categories.length - 1) ? 16 : 0}}>
                <View style={{ flex: item.id, backgroundColor: currentTab === item.slug ? "#E53C6B" : "#fff", ...styles.filterTab }}>
                    <RegularText style={{ color: currentTab === item.slug ? "#fff" : "#2E2B53", fontSize: 16 }}>{item.name}</RegularText>
                </View>
            </Pressable>
        </>
    );

    const renderSpecificCategoryItems = async (category) => {
        try {
            var params = {
                ...queryParams,
                category: category
            }

            if (category === "all") {
                delete params.category;
            }

            setQueryParams(params);
            const queryString = new URLSearchParams(params).toString().replace(/\+/g, " ");

            const catVoucherRes = await get(`vouchers/?${queryString}`);
            setScrollOffset(horizontalScrollPosition);
            setVouchers(catVoucherRes?.results);
            setNoVouchers(catVoucherRes?.results.length === 0);
        } catch (error) {
            console.log("err.messages.message: ", error.response.data.messages[0].message);
        }
    }

    const sortPrizes = async (key, value) => {
        try {
            var params = {
                ...queryParams,
                [key]: value
            }

            if (key === "ordering" && value === "") {
                delete params.ordering;
            }

            if (key === "coins_only" && value === false) {
                delete params.coins_only;
            }

            if (key === "popular" && value === false) {
                delete params.popular;
            }

            if (key === "popular") {
                value ? setPopular(false) : setPopular(true);
            }

            if (key === "coins_only") {
                value ? setCoinsOnly(false) : setCoinsOnly(true);
            }

            if (key === "ordering") {
                value !== "" ? setPriceOrder("") : setPriceOrder("cash");
            }

            setQueryParams(params);

            const queryString = new URLSearchParams(params).toString().replace(/\+/g, " ");

            const catVoucherRes = await get(`vouchers/?${queryString}`);
            setScrollOffset(horizontalScrollPosition);

            setVouchers(catVoucherRes?.results);
            setNoVouchers(catVoucherRes?.results.length === 0);
        } catch (error) {
            console.log(error);
        }
    }

    const renderVouchersList = ({ item }) => {
        return <View style={{ marginBottom: 20, paddingHorizontal: 16 }}><FullVoucher item={item} key={item.id} /></View>
    }

    const onHorizontalScroll = (event) => {
        // Save the horizontal scroll position
        setHorizontalScrollPosition(event.nativeEvent.contentOffset.x);
    };

    // useEffect( () => {
    //     setScrollOffset(horizontalScrollPosition);
    // }, [vouchers])

    useEffect(() => {
        getCategories();
        getVouchers();
        setCurrentPage(1)
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setQueryParams({ limit: 10 });
        setCurrentPage(1);
        setSearchVal("");
        getCategories();
        getVouchers();

        setTimeout(() => {
            setPopular(true)
            setCoinsOnly(true)
            setPriceOrder("cash")
            setCurrentTab("all")

            setRefreshing(false);
        }, 1200);
    }, []);

    return (
        <Layout>
            <View style={styles.container}>
                <View style={styles.fullVouchersList} key={currentTab}>
                    <FlatList
                        data={vouchers}
                        renderItem={renderVouchersList}
                        keyExtractor={item => item.name}
                        showsHorizontalScrollIndicator={false}
                        ListHeaderComponent={
                            <View style={{ flexDirection: "column", gap: 14, marginBottom: 10 }}>
                                <View style={{paddingHorizontal: 16}}>
                                    <TextInput
                                        style={styles.searchInput}
                                        onChangeText={(val) => searchChange(val)}
                                        value={searchVal}
                                        placeholder="Search"
                                        keyboardType="text"
                                        allowFontScaling={false}
                                    />
                                </View>

                                <View style={styles.filterTabs}>
                                    <FlatList
                                        data={categories}
                                        renderItem={renderVoucherItem}
                                        keyExtractor={item => item.name}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        onScroll={onHorizontalScroll}
                                        contentOffset={{ x: scrollOffset, y: 0 }}
                                    />
                                </View>

                                <View style={{...styles.sortByFilter, paddingHorizontal: 16}}>
                                    <Pressable style={{ flex: 1, backgroundColor: "#fff", ...styles.singleSortFilter }} onPress={() => sortPrizes("popular", popular)}>
                                        <PrizesStarIcon isActive={popular ? false : true} color={"#E53C6B"} width={16} height={15} />
                                        <RegularText style={{ fontSize: 16, color: popular ? "#000" : "#E53C6B" }}>Popular</RegularText>
                                    </Pressable>

                                    <Pressable style={{ flex: 1, backgroundColor: "#fff", ...styles.singleSortFilter }} onPress={() => sortPrizes("coins_only", coinsOnly)}>
                                        <SortCoins isActive={coinsOnly ? false : true} />
                                        <RegularText style={{ fontSize: 16, color: coinsOnly ? "#000" : "#E53C6B" }}>Coins Only</RegularText>
                                    </Pressable>

                                    {/* <Pressable style={{ ...styles.singleSortFilter, borderRightWidth: 0}} onPress={() => sortPrizes("ordering", priceOrder)}>
                                        <AscDscSortIcon isActive={priceOrder !== "" ? false : true} />
                                        <RegularText style={{fontSize: 16, color: priceOrder !== "" ? "#000" : "#E53C6B"}}>Price</RegularText>
                                    </Pressable> */}
                                </View>
                            </View>
                        }
                        ListEmptyComponent={
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
                                <NoVoucherIcon width={100} height={100} />
                                <RegularText style={{ textAlign: "center", fontSize: 16, marginTop: 10 }}>
                                    No vouchers matched the selected filters.
                                </RegularText>
                                {/* <Pressable onPress={resetFilters} style={{ backgroundColor: "#E53C6B", padding: 10, borderRadius: 5, marginTop: 10 }}>
                                    <RegularText style={{ color: "#fff", textAlign: "center" }}>Reset Filters</RegularText>
                                </Pressable> */}
                            </View>
                        }
                        onEndReached={getMoreVouchers}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        ListFooterComponent={<View style={{ marginVertical: 10 }}></View>}
                        style={{ paddingTop: 20 }}
                    />

                </View>
            </View>
        </Layout>
    );
}
