import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText
} from "./AppTexts";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(date);
};

export default Article = ({
    itemWidth,
    imageHeight = 140,
    item = {},
}) => {

    item = item;

    const styles = StyleSheet.create({
        articleMainWrapper: {
            backgroundColor: "#fff",
            borderRadius: 20,
            // marginLeft: 12,
            flex: 1,
            width: itemWidth,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3.84,
            elevation: 4,
            marginVertical: 10,
        },
        articleMain: {
            flexDirection: "column",
            gap: 6,
            justifyContent: "space-between",
            backgroundColor: "#fff",
            borderRadius: 20,
            paddingBottom: 28,
        },
        articlePrice: {
            fontSize: 14,
            flexDirection: 'row',
            alignItems: 'center'
        },
        articleImg: {
            width: "100%",
            height: imageHeight,
            borderRadius: 10,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        },
        coinImg: {
            width: 20,
            height: 20,
            resizeMode: 'contain',
        },
        articleContent: {
            paddingLeft: 14,
            paddingRight: 2,
            flexDirection: "column",
            gap: 4
        }
    });

    return (
        <View style={styles.articleMainWrapper}>
            <View style={styles.articleMain}>
                <Image source={{ uri: item?.image }} style={styles.articleImg} />
                <View style={styles.articleContent}>
                    <RegularText style={{ color: "#f2ad85", fontSize: 14 }}>{item?.category}</RegularText>
                    <SemiBold style={{ fontSize: 18, color: "#0C1433" }}>
                    {item?.title !== undefined && (
                        item.title.length > 44 ? `${item.title.substring(0, 44)}...` : item.title
                    )}
                    </SemiBold>
                    <MediumText style={styles.articlePrice}>{formatDate(item?.created)} · {item?.reading_time} min reading time</MediumText>
                </View>
            </View>
        </View>
    );
}

