import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, Image, Button, Pressable, FlatList, Dimensions, ScrollView} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackBtnIcon from '../../assets/icons/BackBtnIcon';
import styles from './SingleArticle.styles';
import { useNavigation, useScrollToTop, useFocusEffect } from "@react-navigation/native";
import typography from "../../utils/typography";
import TimeIcon from "../../assets/icons/TimeIcon";
import { get } from "../../utils/axios";
import Coin2 from "../../assets/icons/Coin2";
import NewArticle from "../../components/NewArticle";
import RightLineArrow from "../../assets/icons/RightLineArrow";

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "../../components/AppTexts";

const formatDate = (dateString) => {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date");
        }
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).format(date);
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid Date";
    }
};

const SinglePrize = ({ route }) => {
    const { image, title, thumbnail, category, content, author, name, reading_time, id,created } = route.params;

    const navigation = useNavigation();
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [articleData, setArticleData] = useState([]);
    const date = route.params.created || articleData.created; // Use the created date from route params or fetched data

    const scrollRef = useRef(null);

    const previousPage = () => {
        navigation.goBack();
    }

    const getArticle = async () => {
        try {
            const article = await get(`article/${id}/`);
            setArticleData(article);
        } catch (err) {
            console.log("err: ", err);
        }
    }

    const handleLetsWalk = () => {
        navigation.navigate("Home");
    }


    useEffect(() => {
        getArticle();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getArticle();
            
            if (scrollRef.current) {
                scrollRef.current.scrollTo({ y: 0, animated: true });
            }
        }, [id])
    );

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ScrollView ref={scrollRef}>
                    <View style={styles.prizeImgContainer}>
                        <View style={styles.backBtn}>
                            <Pressable onPress={previousPage}>
                                <BackBtnIcon />
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.prizeContent}>
                        <View>
                            <RegularText style={{color: "#f2ad85", fontSize: 14}}>{category}</RegularText>
                        </View>
                        <View>
                            <SemiBold style={styles.prizeTitle}>{title}</SemiBold>
                        </View>
                        <View style={styles.timeLeft}>
                            <View style={styles.validUntil}>
                                <RegularText>{formatDate(date)}</RegularText>
                                <RegularText>{reading_time} minutes reading time</RegularText>
                            </View>
                        </View>
                    </View>
                    <View style={{marginRight: 20}}>
                        <Image style={styles.articleImg} source={{uri: image}} resizeMode="contain" />
                    </View>

                    <View style={styles.aboutOffer}>
                        <RegularText style={{fontSize: 18, lineHeight: 27}}>{content}</RegularText>
                    </View>

                    <View style={styles.writtenByShadow}>
                        <View style={styles.writtenByMain}>
                            <View style={{marginBottom: 10, borderBottomWidth: 1, borderColor: "#E4EDF7", paddingBottom: 10}}>
                                <MediumText>Written by</MediumText>
                                <View style={{flexDirection: "row", alignItems: "center", gap: 4}}>
                                    <MediumText>{author}</MediumText>
                                </View>
                            </View>
                            <View style={{flexDirection: "row", gap: 4}}>
                                <Coin2 />
                                <View style={{flexDirection: "column", gap: 2}}>
                                    <SemiBold>Get healthier with us</SemiBold>
                                    <RegularText>Let’s walk and convert your step into coins</RegularText>
                                    <Pressable onPress={handleLetsWalk} style={{...typography.commonBtn, width: "50%", backgroundColor: "#E53C6B", marginTop: 10}}>
                                        <View style={{flexDirection: "row", alignItems: "center", gap: 6}}>
                                            <RegularText style={{color: "#fff"}}>Let’s Walk</RegularText>
                                            <RightLineArrow color="#fff" />
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.realtedActiles}>
                        {articleData?.related_articles != "" && ( <>
                            <SemiBold style={{fontSize: 20, marginVertical: 18}}>Related Articles</SemiBold>
                            <View style={styles.relatedArticlesMain}>
                                {articleData.related_articles?.map((item) => (
                                    <View style={styles.singleRelatedArticle} key={item.id}>
                                        <NewArticle item={item} scrollRef={scrollRef} shadowOpacity={0.2} />
                                    </View>
                                ))}
                            </View>
                        </> )}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default SinglePrize;