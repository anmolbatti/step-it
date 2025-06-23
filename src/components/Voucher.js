import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import CoinIcon from '../assets/icons/CoinIcon';
import { useNavigation } from "@react-navigation/native";
import { appTypo } from "../utils/typography";

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "./AppTexts";

export default Voucher = ({ itemWidth, item }) => {
    const navigation = useNavigation();
    const voucherData = item;

    const viewSinglePrize = (item) => {
        const { id, name, image, description, coins, cash, thumbnail, available_to, vendor } = item;
        navigation.navigate("SinglePrize", { id, name, image, description, coins, cash, thumbnail, available_to, vendor });
    }

    const styles = StyleSheet.create({
        voucherMainWrapper: {
            backgroundColor: "#fff",
            flex: 1,
            borderRadius: 20,
            width: itemWidth,
        },
        voucherMain: {
            flexDirection: "column",
            gap: 6,
            justifyContent: "space-between",
            backgroundColor: "#fff",
            borderRadius: 20,
            paddingBottom: 6,
        },
        voucherPrice:{
            fontSize: 16,
            fontWeight: "600",
            flexDirection: 'row',
            alignItems: 'center',
            color: "#0C1433"
        },
        voucherImg: {
            width: "100%",
            height: 140,
            borderRadius: 10,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
        },
        coinImg: {
            width: 20,
            height: 20,
            resizeMode: 'contain',
        },
        voucherContent: {
            flexDirection: "column",
            gap: 8
            // paddingLeft: 14
        },
        pricingText: {
            flexDirection: "row",
            alignItems: "center",
            // gap: 4,
        },
        buyBtn: {
            backgroundColor: appTypo.secondaryColor,
            borderRadius: 40,
            paddingVertical: 10
        }
    });

    return (
        <View style={styles.voucherMainWrapper}>
            <View style={styles.voucherMain}>
                <Image source={{uri: voucherData.thumbnail}} style={styles.voucherImg} />
                <View style={styles.voucherContent}>
                    <SemiBold style={{fontSize: 18,  color: "#0C1433"}}>{voucherData.name}</SemiBold>
                    <View style={styles.pricingText}>
                        <MediumText style={styles.voucherPrice}>
                            {voucherData?.cash == 0 ? "" : `$${voucherData?.cash.toLocaleString()} + `} 
                        </MediumText>

                        <CoinIcon height={20} width={20} />

                        <MediumText> {voucherData.coins}</MediumText>
                    </View>

                    <Pressable onPress={() => viewSinglePrize(voucherData)} style={styles.buyBtn}>
                        <SemiBold style={{color: "#fff", textAlign: "center", fontSize: 18}}>Buy</SemiBold>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
