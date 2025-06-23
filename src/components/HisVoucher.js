import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { RegularText, SemiBold } from "./AppTexts";

export default HisVoucher = ({ itemWidth="100%", item }) => {
    const navigation = useNavigation();

    const viewSingleDetail = (id, image, name, by) => {
        navigation.navigate("RedemptionDetail", { id, image, name, by });
    }
    // console.log("ffffffffff",id, image, name, by)

    const styles = StyleSheet.create({
        voucherMainWrapper: {
            backgroundColor: "#fff",
            borderRadius: 20,
            marginBottom: 16,
            width: itemWidth,
            shadowColor: '#000',
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 3.84,
            elevation: 4,
        },
        voucherMain: {
            flexDirection: "row",
            gap: 6,
            // justifyContent: "space-between",
            backgroundColor: "#fff",
            borderRadius: 20,
            // paddingBottom: 10,
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
            width: "45%",
            height: 170,
            borderRadius: 10,
            // borderBottomLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
        },
        coinImg: {
            width: 20,
            height: 20,
            resizeMode: 'contain',
        },
        voucherContent: {
            flexShrink: 1,
            paddingTop: 16,
            flexDirection: "column",
            gap: 16,
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
        }
    });

    return (
        <Pressable onPress={() => viewSingleDetail(item.id, item.image, item.name)} style={{marginHorizontal: 16}}>
            <View style={styles.voucherMainWrapper}>
                <View style={styles.voucherMain}>
                    <Image source={{uri: item.image}} style={styles.voucherImg} />
                    <View style={styles.voucherContent}>
                        <SemiBold style={styles.voucherHeading}>{item.name}</SemiBold>
                        <RegularText style={{ fontSize: 16 }}>Valid until {new Date(item.expired_at).toLocaleDateString('en-GB').replace("/", "-").replace("/", "-")}</RegularText>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}
