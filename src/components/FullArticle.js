import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import mriImg from "../assets/images/mri_img.jpg";
import pregImg from "../assets/images/pregnancy.jpg";
import coin from '../../assets/coin.png';
import { useNavigation } from "@react-navigation/native";

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "./AppTexts";
import { appTypo } from "../utils/typography";

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

export default FullArticle = ({ 
    itemWidth="100%", 
    imageHeight=80 ,
    item={},
    shadowOpacity=0.3
}) => {

    const styles = StyleSheet.create({
        articleMainWrapper: {
            backgroundColor: appTypo.lightGrey,
            borderRadius: 20,
            // marginRight: 16,
            // width: itemWidth,
            borderRadius: 10,
            // paddingHorizontal: 10,
            // paddingVertical: 10,
            flexDirection: "column",
            gap: 6,
            // shadowColor: 'gray', // Shadow color
            // shadowOffset: { width: 0, height: 2 }, // Offset of the shadow
            // shadowOpacity: shadowOpacity, // Opacity of the shadow
            // shadowRadius: 3, // Blur radius of the shadow
            // elevation: 4,
        },
        articleMain: {
            flexDirection: "row",
            backgroundColor: appTypo.lightGrey,
            alignItems: "center",
            gap: 24
        },
        articlePrice:{
            fontSize: 14,
            flexDirection: 'row',
            alignItems: 'center'
        },
        articleImg: {
            width: 150,
            height: 150,
            borderRadius: 10,
            // flex: 1
        },
        coinImg: {
            width: 20,
            height: 20,
            resizeMode: 'contain',
        },
        articleContent: {
            flexDirection: "column",
            gap: 2,
            flexShrink: 1
            // flex: 2
        }
    });

    const navigation = useNavigation();
    const viewSingleArticle = (category, image, title, content, reading_time, id) => {
        navigation.navigate("SingleArticle", { category, image, title, content, reading_time, id });
    }

    return (
        <Pressable onPress={() => viewSingleArticle(item.category, item.image, item.name, item.content, item.reading_time, item.id)}>
            <View style={styles.articleMainWrapper}>
                <View style={styles.articleMain}>
                    <Image source={{uri: item.image}} style={styles.articleImg} resizeMode="cover"/>
                    <View style={styles.articleContent}>
                        {/* <RegularText style={{color: "#f2ad85", fontSize: 14}}>{item.category}</RegularText> */}
                        <SemiBold style={{fontSize: 18, color: "#0C1433"}}>
                            {item?.title.substr(0, 44)} {(item?.title.length > 44 ? "..." : "")}
                        </SemiBold>

                        <RegularText style={{fontSize: 14, color: "#43506C"}}>
                            {item?.content.substr(0, 44)} {(item?.content.length > 44 ? "..." : "")}
                        </RegularText>

                        <MediumText style={styles.articlePrice}>{formatDate(item?.created)} · <MediumText style={{color: appTypo.midGrey}}>{item?.reading_time} min read</MediumText></MediumText>
                    </View>
                </View>

            </View>
        </Pressable>
    );
}

