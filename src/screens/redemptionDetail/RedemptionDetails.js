import { useCallback, useEffect, useState } from "react";
import { Text, View, TextInput, FlatList, Pressable, Image, TouchableWithoutFeedback, Linking, ScrollView } from "react-native";
import DetailInsightsLayout from "../DetailInsightsLayout";
import styles from "./RedemptionDetails.styles";
import CheckIcon from '../../assets/icons/CheckIcon';
import NumberIcon2 from '../../assets/icons/NumberIcon2';
import NumberIcon3 from '../../assets/icons/NumberIcon3';
import CopyIcon from '../../assets/icons/CopyIcon';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "../../components/AppTexts";
import { useFocusEffect } from "@react-navigation/native";
import { get } from "../../utils/axios";

export default RedemptionDetail = ({ route }) => {
    const { image, id }  = route.params;
    const [ data , setData ] = useState({});

    const getSingleVoucher = async () => {
        try{
            const singleVoucherRes = await get(`redemption/${id}/`);

            setData(singleVoucherRes);
        } catch (err) {

        }
    }

    const getDate = (dateStr) => {
        if(dateStr){

            const date = new Date(dateStr);
            const monthArr = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
            var day = date.getDate();
            var month = monthArr[date.getMonth()];
            var year = date.getFullYear();
            var hours = date.getHours();
            var mins = date.getMinutes();

            return `${day} ${month} ${year} ${hours} ${mins}`;
        }
    }

    useFocusEffect(
        useCallback(() => {
            getSingleVoucher();
            
        }, [id])
    );

    console.log("data: ", data);

    return (
        <DetailInsightsLayout pageName={"Reward Details"} showDate={false}>
            
            <View style={styles.container}>
                <View style={{borderBottomWidth: 1,borderColor: "#A2B5D2", paddingBottom: 8}}>
                    <RegularText style={{fontSize: 18, color: "#0C1433"}}>PURCHASED ON {getDate(data.expired_at)}</RegularText>

                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <RegularText style={{fontSize: 18, color: "#0C1433", marginTop: 10}}>Coins redeemed</RegularText>
                        <MediumText style={{color: '#E53C6B', fontSize: 16}}>-{data?.coins}</MediumText>
                    </View>
                </View>

                <View style={styles.redeemContent} />
                    <View style={{marginBottom: 14}}>
                        <SemiBold style={{fontSize: 20, color: "#0C1433", marginTop: 6}}>Use your voucher now!</SemiBold>
                    </View>

                    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                
                        <View style={{flexDirection: "row", alignItems: "center", gap: 16}}>
                            <Image source={{uri: data.image}} resizeMode="cover" style={{height: 100, width: 100}} />
                            <SemiBold style={{fontSize: 20}}>{data.name}</SemiBold>
                        </View>

                        <View style={styles.aboutOffer}>
                            <SemiBold style={{fontSize: 20}}>About the offer</SemiBold>

                            <RegularText style={{fontSize: 18, lineHeight: 27}}>{data?.descriptions}</RegularText>
                        </View>

                        <View style={styles.redeemPrizeBtn}>
                            <Pressable style={{...typography.commonBtn, paddingVertical: 16, paddingHorizontal: 40, borderRadius: 100, backgroundColor: "#E53C6B"}}>
                                <SemiBold style={styles.convertBtnText}><CopyIcon /> + {data?.code}</SemiBold>
                            </Pressable>
                        </View>

                        <View style={styles.redeemInstruction}>
                            <SemiBold style={{fontSize: 20, textAlign: "center",}}>Redeeming Instructions</SemiBold>
                            <View style={styles.rectangularBox}>
                                <View style={styles.tickContainer}>
                                    <CheckIcon />
                                </View>
                                
                                <RegularText style={styles.randomText}>Buy the offer with health coins</RegularText>

                            </View>

                            <View style={styles.rectangularBoxPlain}>
                                <View style={styles.tickContainer}>
                                    <NumberIcon2 />
                                </View>
                                
                                <RegularText style={styles.randomText}>Claim your offer and use the coupon code at the merchant website checkout page</RegularText>

                            </View>

                            <View style={styles.rectangularBoxRedeemVoucher}>
                                <View style={styles.tickContainer}>
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
                    </ScrollView>
                </View>
        </DetailInsightsLayout>
    );
}
