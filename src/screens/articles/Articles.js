import { useEffect, useState, useCallback } from 'react';
import { Text, View, FlatList, Pressable, Dimensions, RefreshControl, ScrollView } from "react-native";
import Layout from "../Layout";
import styles from "./Articles.styles";
import Article from "../../components/Article";
import NewArticle from "../../components/NewArticle";
import healthImage from "../../assets/images/health.png";
import homeLiving from "../../assets/images/homeLiving.png";
import bodyHealth from "../../assets/images/bodyHealth.png";
import { get } from "../../utils/axios";
import { useNavigation } from '@react-navigation/native';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "../../components/AppTexts";

export default Articles = () => {
    const [ currentTab, setCurrentTab ] = useState("all");
    const [ articlesData, setArticlesData ] = useState([]);
    const [ currentCategory, setCurrentCategory ] = useState();
    const [ categories, setCategories ] = useState([]);
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);

    const [scrollOffset, setScrollOffset] = useState(0);
    const [horizontalScrollPosition, setHorizontalScrollPosition] = useState(0);

    const articleTabs = [
        { id: 1, name: 'All services', tabIdentifier: 'allServices' },
        { id: 2, name: 'Health', tabIdentifier: 'health' },
        { id: 3, name: 'Home Living', tabIdentifier: 'homeLiving' },
        { id: 4, name: 'Fitness', tabIdentifier: 'fitness' },
    ];

    const articleFlatList = [
        { id: 1, name: 'All services', tabIdentifier: 'allServices' },
        { id: 2, name: 'Health', tabIdentifier: 'health'},
        { id: 3, name: 'Home Living', tabIdentifier: 'homeLiving'},
        { id: 4, name: 'Fitness', tabIdentifier: 'fitness'},
    ];

    const changeTab = (tab) => {
        setScrollOffset(horizontalScrollPosition);
        renderSpecificCategoryItems(tab);
        setCurrentTab(tab);
    }

    const onHorizontalScroll = (event) => {
        // Save the horizontal scroll position
        setHorizontalScrollPosition(event.nativeEvent.contentOffset.x);
    };

    const getCategories = async () => {
        try {
            const categoriesRes = await get("article-categories/");
            setScrollOffset(horizontalScrollPosition);
            setCategories(categoriesRes);

        } catch (error) {
            console.log("err.messages.message: ", error.response.data.messages[0].message);
            // alert(error.response.data.messages[0].message);
        }
    }

    const getAricles = async () => {
        try {
            const ariclesResponse = await get("articles/?limit=20");
            setScrollOffset(horizontalScrollPosition);
            setArticlesData(ariclesResponse?.results)

        } catch (error) {
            console.log("err.messages.message: ", error.response.data.messages[0].message);
            // alert(error.response.data.messages[0].message);
        }
    }

    const renderSpecificCategoryItems = async ( category ) =>{
        try {
            const catRes = await get(`articles/${category === "all" ? "?limit=20" : `?category=${category}&limit=20`}`);
            setScrollOffset(horizontalScrollPosition);
            setArticlesData(catRes?.results)

        } catch (error) {
            console.log("err.messages.message: ", error.response.data.messages[0].message);
            // alert(error.response.data.messages[0].message);
        }
    }

    const renderAricleTabItem = ({ item, index }) => (
        <>
            {index === 0 &&  
            (<Pressable onPress={() => changeTab("all")} style={{marginLeft: 16}}>
                <View style={{flex: item.id, backgroundColor: currentTab === "all" ? "#E53C6B" : "#fff", ...styles.filterTab}}>
                    <RegularText style={{color: currentTab === "all" ? "#fff" : "#2E2B53", fontSize: 16 }}>All Articles</RegularText>
                </View>
            </Pressable>
            )}

            <Pressable onPress={() => changeTab(item.slug)} style={{marginRight: index === (categories.length -1) ? 16 : 0}}>
                <View style={{flex: item.id, backgroundColor: currentTab === item.slug ? "#E53C6B" : "#fff", ...styles.filterTab}}>
                    <RegularText style={{color: currentTab === item.slug ? "#fff" : "#2E2B53", fontSize: 16 }}>{ item.name }</RegularText>
                </View>
            </Pressable>
        </>
    );

    const screenWidth = Dimensions.get('window').width;
    const arcticleItemWidth = screenWidth / 1.3;

    const viewSingleArticle = (item) => {
        const { type, image, title,thumbnail, category, content, author, name, reading_time, id ,created} = item;

        navigation.navigate("SingleArticle", { id, type, image, title,thumbnail, category, content, author, name, reading_time,created });
    }

    const renderAllAricleTabItem = ({ item, index }) => (
        <Pressable onPress={() => viewSingleArticle(item)} style={{marginLeft: index === 0 ? 16 : 12, marginRight: articlesData.length === index + 1 ? 16 : 0}}>
            <Article 
                itemWidth={arcticleItemWidth} 
                imageHeight={180} 
                item={item}
            />
        </Pressable>
    );

    const renderNewArticles = ({ item }) => {
        return <View style={{paddingHorizontal: 16, marginBottom: 20}}><NewArticle item={item} key={item.id} /></View>
    }

    useEffect(() =>{
        getCategories();
        getAricles();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        getCategories();
        getAricles();
        
        setTimeout(() => {
          setRefreshing(false);
        }, 1200);
    }, []);

    return (
        <Layout>
            <View style={styles.container} key={currentTab}>
                {articlesData && (
                    <FlatList
                        data={articlesData}
                        renderItem={renderNewArticles}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        ListHeaderComponent={
                            <View style={styles.articleHeader}>
                                <View style={{paddingLeft: 16}}>
                                    <SemiBold style={{fontSize: 21}}>Articles</SemiBold>
                                </View>
        
                                {categories && (
                                    <View style={styles.filterTabs}>
                                        <FlatList
                                            data={categories}
                                            renderItem={renderAricleTabItem}
                                            keyExtractor={item => item.name}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            onScroll={onHorizontalScroll}
                                            contentOffset={{ x: scrollOffset, y: 0 }}
                                        />
                                    </View>
                                )}
        
                                <View style={styles.fullVouchersList}>
                                    <FlatList
                                        data={articlesData}
                                        renderItem={renderAllAricleTabItem}
                                        keyExtractor={item => item.id}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                    /> 
                                </View>

                                <View style={{marginLeft: 12}}>
                                    <SemiBold style={{fontSize: 21}}>New Articles</SemiBold>
                                </View>
                            </View>
                        }
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    /> 
                )}
            </View>
        </Layout>
    );
}
