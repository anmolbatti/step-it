import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, ScrollView, Dimensions } from 'react-native';
import BackBtnIcon from '../../assets/icons/BackBtnIcon';
import styles from './SinglePrize.styles';
import { useNavigation } from "@react-navigation/native";
import coin from '../../../assets/coin.png';
import TimeIcon from "../../assets/icons/TimeIcon";
import { post } from "../../utils/axios";

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText
} from "../../components/AppTexts";

import SinglePrizeLayout from "../SinglePrizeLayout";
import messages from "../../utils/messages";

export default SinglePrize = ({ route }) => {
    const { id, image, title, name, cash, coins, available_to, description, vendor } = route.params;
    const navigation = useNavigation();
    const [days, setDays] = useState("");
    const [hours, setHours] = useState("");
    const [mins, setMins] = useState("");
    const [secs, setSecs] = useState("");

    const previousPage = () => {
        navigation.goBack();
    }

    const currentDate = new Date();
    const available_toDate = new Date(available_to);

    function getDateDifference(startDate = currentDate, endDate = available_toDate) {
        if(available_to !== null){

            let difference = Math.abs(startDate.getTime() - endDate.getTime());
            
            const oneDay = 24 * 60 * 60 * 1000;
            const oneHour = 60 * 60 * 1000;
            const oneMinute = 60 * 1000;
            const oneSecond = 1000;
            
            let days = Math.floor(difference / oneDay);
            difference = difference % oneDay;
            
            let hours = Math.floor(difference / oneHour);
            difference = difference % oneHour;
            
            let minutes = Math.floor(difference / oneMinute);
            difference = difference % oneMinute;
            
            let seconds = Math.floor(difference / oneSecond);
            
            if (days >= -1) {
                setDays(days);
            }
            
            if (hours > -1) {
                setHours(hours);
            }
            
            if (minutes > -1) {
                setMins(minutes);
            }
            
            if (seconds > -1) {
                setSecs(seconds);
            }
        }
    }

    const handleRedeemVoucher = async ( setIsPurchased ) => {
        try{
            if(id){
                const redeemResp = await post(`voucher/${id}/redeem/`);
                console.log("redeemResp: ", redeemResp);

                setIsPurchased(true);
            }else{
                alert('Invalid Voucher');
            }

        } catch (err) {
            alert(messages.SOMETHING_WENT_WRONG);
        }
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
            getDateDifference();
        }, 1000);

        return () => clearInterval(interval);
    }, [secs]);

    return (
        <SinglePrizeLayout coins={coins} cash={cash} title={name} image={image} handleRedeemVoucher={handleRedeemVoucher}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <View style={styles.prizeImgContainer}>
                        <View style={styles.backBtn}>
                            <Pressable onPress={previousPage}>
                                <BackBtnIcon />
                            </Pressable>
                        </View>
                        <Image source={{ uri: image }} style={styles.voucherImg} resizeMode="cover" />
                    </View>

                    <View style={styles.prizeContent}>
                        <View>
                            <SemiBold style={styles.prizeTitle}>{name}</SemiBold>
                            <RegularText style={{ fontSize: 18 }}>by {vendor}</RegularText>
                        </View>
                        <View style={styles.timeLeft}>
                            <View style={styles.validUntil}>
                                <RegularText><TimeIcon /> Valid until</RegularText>
                                {available_to !== null && (
                                    <SemiBold>
                                        {new Date(available_to).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                </SemiBold>
                                )}
                            </View>

                            <View style={styles.detailedTime}>
                                <RegularText style={{ color: "#fff" }}>{days} d : </RegularText>
                                <RegularText style={{ color: "#fff" }}>{hours}h : </RegularText>
                                <RegularText style={{ color: "#fff" }}>{mins}m : </RegularText>
                                <RegularText style={{ color: "#fff" }}>{secs}s</RegularText>
                            </View>
                        </View>

                        <View style={styles.aboutOffer}>
                            <SemiBold style={{ fontSize: 20 }}>About the offer</SemiBold>

                            <RegularText style={{ fontSize: 18, lineHeight: 27 }}>{description}</RegularText>
                        </View>
                    </View>

                    {/* <View style={styles.redeemPrizeBtn}>
                        <Pressable style={{...typography.commonBtn, paddingVertical: 16, paddingHorizontal: 40, borderRadius: 100, marginTop: 10, backgroundColor: "#E53C6B"}}>
                            <SemiBold style={styles.convertBtnText}>Redeem for $100 + <Image source={coin} /> 40</SemiBold>
                        </Pressable>
                    </View> */}
                </View>
            </ScrollView>
        </SinglePrizeLayout>
    );
}
