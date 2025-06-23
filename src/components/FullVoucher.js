import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import mriImg from "../assets/images/mri_img.jpg";
import coin from '../../assets/coin.png';
import { useNavigation } from "@react-navigation/native";
import CoinIcon from "../assets/icons/CoinIcon";

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "./AppTexts";

export default FullVoucher = ({ itemWidth="100%", item }) => {
    const navigation = useNavigation();
    const viewSingleDetail = (id, image, name, vendor, cash , coins, available_to, description) => {
        navigation.navigate("SinglePrize", { id, image, name , vendor, cash , coins, available_to, description});
    }

    const styles = StyleSheet.create({
        voucherMainWrapper: {
            backgroundColor: "#fff",
            borderRadius: 20,
            marginRight: 16,
            width: itemWidth,
            shadowColor: '#000', // Shadow color
            shadowOffset: { width: 0, height: 2 }, // Offset of the shadow
            shadowOpacity: 0.3, // Opacity of the shadow
            shadowRadius: 3.84, // Blur radius of the shadow
            elevation: 4,
        },
        voucherMain: {
            flexDirection: "row",
            gap: 10,
            height: 172,
            // justifyContent: "space-between",
            backgroundColor: "#fff",
            borderRadius: 20,
        },
        voucherPrice:{
            fontSize: 18,
            fontWeight: "600",
            flexDirection: 'row',
            alignItems: 'center',
            color: "#0C1433",
            // paddingTop: 10
        },
        voucherImg: {
            width: 172,
            height: "100%",
            borderRadius: 10,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
        },
        coinImg: {
            width: 20,
            height: 20,
            resizeMode: 'contain',
        },
        voucherContent: {
            flexShrink: 1,
            paddingTop: 10,
            flexDirection: "column",
            gap: 6,
            paddingRight: 14,
            width: "60%",
            justifyContent: "space-between",
            // backgroundColor: "red"
        },
        voucherHeading: {
            fontSize: 20, 
            color: "#0C1433",
            lineHeight: 28
        },
        convertBtnText: {
            fontSize: 16,
            lineHeight: 20,
            fontWeight: '600',
            letterSpacing: 0.35,
            color: 'white',
        },
        convertBtn: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 8,
            paddingHorizontal: 0,
            elevation: 3,
            backgroundColor: '#E53C6B',
            borderRadius: 20,
            // width: 130
        },
        pricingText: {
            flexDirection: "row",
            alignItems: "center",
            // gap: 4,
        }
    });

    return (
<Pressable onPress={() => viewSingleDetail(item.id, item.image, item.name, item.vendor, item.cash, item.coins, item.available_to, item.description)}>
    <View style={styles.voucherMainWrapper}>
        <View style={styles.voucherMain}>
            <Image source={{ uri: item.image }} style={styles.voucherImg} />
            <View style={styles.voucherContent}>
                <SemiBold style={styles.voucherHeading}>
                    {/* {item.name} */}
                    {item?.name !== undefined && (
                        item.name.length > 20 ? `${item.name.substring(0, 20)}...` : item.name
                    )}
                </SemiBold>

                <View style={{paddingBottom: 16, flexDirection: "column", gap: 14}}>
                    <View style={styles.pricingText}>
                        <MediumText style={styles.voucherPrice}>
                            {item.cash == 0 ? "" : `$${item.cash} + `} 
                        </MediumText>

                        <CoinIcon height={20} width={20} />

                        <MediumText style={styles.voucherPrice.toLocaleString()}> {item.coins}</MediumText>
                    </View>
                    <Pressable 
                        style={styles.convertBtn} 
                        onPress={() => viewSingleDetail(item.id, item.image, item.name, "Rose Hospital", item.cash, item.coins, item.available_to, item.description)}
                    >
                        <SemiBold style={styles.convertBtnText}>Redeem now</SemiBold>
                    </Pressable>
                </View>
            </View>
        </View>
    </View>
</Pressable>
    );
}

