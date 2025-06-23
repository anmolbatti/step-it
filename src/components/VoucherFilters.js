import React, { useEffect, useState, useRef, memo  }from 'react';
import { View, Image, Pressable, TextInput, ScrollView, Platform, FlatList } from 'react-native';
import { publicPost, get } from '../utils/axios';
import styles from "../screens/prizes/Prizes.styles";

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "./AppTexts";

export default VoucherFilters = ({ changeTab, currentTab}) => {
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const categoriesRes = await get("voucher-categories/");
            setCategories(categoriesRes);
        } catch (error) {
            console.log("err.messages.message: ", error.response.data.messages[0].message);
        }
    }

    const renderVoucherItem = ({ item }) => (
        <>
            {item.id === 1 &&
                (<Pressable onPress={() => changeTab("all")}>
                    <View style={{ flex: item.id, backgroundColor: currentTab === "all" ? "#E53C6B" : "#fff", ...styles.filterTab }}>
                        <RegularText style={{ color: currentTab === "all" ? "#fff" : "#2E2B53", fontSize: 16 }}>All Services</RegularText>
                    </View>
                </Pressable>
                )}

            <Pressable onPress={() => changeTab(item.slug)}>
                <View style={{ flex: item.id, backgroundColor: currentTab === item.slug ? "#E53C6B" : "#fff", ...styles.filterTab }}>
                    <RegularText style={{ color: currentTab === item.slug ? "#fff" : "#2E2B53", fontSize: 16 }}>{item.name}</RegularText>
                </View>
            </Pressable>
        </>
    );

    useEffect(() => {
        getCategories();

    }, []);

    return (
        <FlatList
            data={categories}
            renderItem={renderVoucherItem}
            keyExtractor={item => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
            // onScroll={onHorizontalScroll}
            // contentOffset={{ x: horizontalScrollPosition, y: 0 }}
        />
    );
}