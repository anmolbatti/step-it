import React from "react";
import { View, StyleSheet, Image, Dimensions, Pressable, ScrollView } from "react-native";
import PopupLineIcon from "../../assets/icons/PopupLineIcon";
import CopyIcon from '../../assets/icons/CopyIcon';
import NumberIcon2 from '../../assets/icons/NumberIcon2';
import NumberIcon3 from '../../assets/icons/NumberIcon3';
import CheckIcon from '../../assets/icons/CheckIcon';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText
} from "../../components/AppTexts";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
        flexDirection: "column",
        backgroundColor: "#fff",
        marginTop: 40
    },
    convertBtnText: {
        fontSize: 18,
        lineHeight: 20,
        letterSpacing: 0.35,
        color: '#fff',
    },
    centerContent: {
        flexDirection: "column",
        alignItems: "center",
        gap: 16
    },
    redeemInstruction: {
        backgroundColor: "#ffff",
        textAlign: "center",
        flexDirection: "column",
        gap: 20,
    },
    rectangularBox: {
        height: 70,
        backgroundColor: '#E1DEF6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    randomText: {
        fontSize: 18,
        lineHeight: 20,
        textAlign: 'center'
    },
    rectangularBoxPlain: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1, // Adjust the width of the border as needed
        borderColor: "#000",
        paddingHorizontal: 14,
        paddingVertical: 10,
        flexDirection: "column",
        gap: 10
    },
    rectangularBoxRedeemVoucher: {
        backgroundColor: '#E4EDF7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        flexDirection: "column",
        gap: 4
    },
    contactUs:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    randomTextCenter: {
        fontSize: 17,
        lineHeight: 20,
        textAlign: 'center'
    },
    link:{
        textDecorationLine: 'underline',
        fontSize: 18,
    },
    scrollContainer: {
        // paddingBottom: 50
    }
});

const TopHeadingRedemption = ({ toggleSwipeUpDown }) => {
    const hideShow = () => {
        toggleSwipeUpDown();
    }

    return (
        <Pressable onPress={hideShow}>
            <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 8, paddingVertical: 20, bottom: 5}}>
                    <PopupLineIcon />
                <SemiBold style={{fontSize: 18}}>Purchased successfully!</SemiBold>
            </View>
        </Pressable>
    )
}

const CenterContentRedemption = ({ image, code="HP-X-LIS-C10FC78", toggleSwipeUpDown={toggleSwipeUpDown} }) => {
    return (
        <View style={styles.container}>
            <TopHeadingRedemption toggleSwipeUpDown={toggleSwipeUpDown} />
                
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.centerContent}>
                    <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                        <View>
                            <Image source={{uri: image}} style={{height: 80, width: 80, borderRadius: 4}} resizeMode="cover"/>
                        </View>

                        <View style={{flexDirection: "column", gap: 4, flex: 1}}>
                            <RegularText style={{fontSize: 12}}>PURCHASED ON 20 NOV 2023, 03:00 PM</RegularText>
                            <SemiBold style={{fontSize: 18}}>Aesthetic Lamp</SemiBold>
                            <MediumText style={{fontSize: 16}}>by Rose Furniture</MediumText>
                        </View>
                    </View>

                    <View style={{marginBottom: 8}}>
                        <Pressable style={{...typography.commonBtn, paddingVertical: 16, paddingHorizontal: 40, borderRadius: 100, backgroundColor: "#E53C6B"}}>
                            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5}}>
                                <CopyIcon />
                                <SemiBold style={styles.convertBtnText}>{code}</SemiBold>
                            </View>
                        </Pressable>
                    </View>

                    <View style={{borderBottomWidth: 1, width:"100%",  borderColor: "#E4EDF7", lineHeight: 2}}></View>

                    <View style={styles.redeemInstruction}>
                        <SemiBold style={{fontSize: 20, textAlign: "center",}}>Redeeming Instructions</SemiBold>
                        <View style={styles.rectangularBox}>
                            <View style={styles.tickContainer}>
                                <CheckIcon />
                            </View>
                            
                            <RegularText style={styles.randomText}>Buy the offer with health coins</RegularText>

                        </View>

                        <View style={styles.rectangularBoxPlain}>
                            <View>
                                <NumberIcon2 />
                            </View>
                            
                            <RegularText style={styles.randomText}>Claim your offer and use the coupon code at the merchant website checkout page</RegularText>

                        </View>

                        <View style={styles.rectangularBoxRedeemVoucher}>
                            <View>
                                <NumberIcon3 />
                            </View>
                            
                            <RegularText style={styles.randomText}>Have you redeemed the vouched yet?</RegularText>
                            <Pressable style={{...typography.commonBtn, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 100, marginTop: 10, backgroundColor: '#A2B5D2'}}>
                                <SemiBold style={styles.convertBtnText}>I have redeemed the voucher</SemiBold>
                            </Pressable>
                        </View>

                        <View style={styles.contactUs}>                            
                            <RegularText style={styles.randomTextCenter}>Are you having any issue with the{'\n'}offer?</RegularText>
                            <Pressable>
                                <RegularText style={styles.link}>Contact Us</RegularText>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export {
    TopHeadingRedemption,
    CenterContentRedemption
}