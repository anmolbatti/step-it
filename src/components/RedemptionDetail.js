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

export default NewArticle = ({ 
    // type="Mom and Kids", 
    // title="Common Signs of Pregnancy and Other Signs that Are rarely Noticed", 
    // itemWidth="100%", 
    image=pregImg, 
    imageHeight=80 
}) => {

    const styles = StyleSheet.create({
        articleMainWrapper: {
            // backgroundColor: "#fff",
            borderRadius: 20,
            // marginRight: 16,
            // width: itemWidth,
            borderRadius: 10,
            paddingHorizontal: 10,
            // paddingVertical: 10,
            flexDirection: "column",
            gap: 6
        },
        articleMain: {
            // flexDirection: "row",
            // justifyContent: "space-between",
            // alignItems: "center",
            // backgroundColor: "#fff",
            // alignItems: "center",
        },
        // articlePrice:{
        //     fontSize: 14,
        //     flexDirection: 'row',
        //     alignItems: 'center'
        // },
        articleImg: {
            width: "25%",
            marginTop: 10,
            height: imageHeight,
            borderRadius: 10,
            flex: 1
        },
        // coinImg: {
        //     width: 20,
        //     height: 20,
        //     resizeMode: 'contain',
        // },
        // articleContent: {
        //     flexDirection: "column",
        //     gap: 2,
        //     flex: 2
        // }
    });

    const navigation = useNavigation();
    const viewSingleArticle = (type, image, title) => {
        navigation.navigate("SingleArticle", { image });
    }

    return (
        <Pressable onPress={() => viewSingleArticle( image)}>
            <View style={styles.articleMainWrapper}>
                <View style={styles.articleMain}>
                    <View style={styles.articleContent}>
                        {/* <SemiBold style={{fontSize: 18, color: "#0C1433"}}>{title}</SemiBold> */}
                    </View>
                    <Image source={image} style={styles.articleImg} />
                </View>

            </View>
        </Pressable>
    );
}

