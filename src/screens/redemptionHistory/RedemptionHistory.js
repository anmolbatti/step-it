import React, { useState, useEffect, useCallback } from "react";
import { Text, View, RefreshControl, ScrollView, FlatList } from "react-native";
import DetailInsightsLayout from "../DetailInsightsLayout";
import styles from "./RedemptionHistory.styles";
import HisVoucher from "../../components/HisVoucher";
import axios from 'axios';
import { RegularText, BoldText, SemiBold, MediumText } from "../../components/AppTexts";
import { get } from "../../utils/axios";
import NoVoucherIcon from '../../assets/icons/NoVoucherIcon';

export default DailyActivities = () => {
    const [vouchers, setVouchers] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchRedemptions = async () => {
        try {
            const response = await get('redemptions/?limit=20');
            setVouchers(response.results);
        } catch (error) {
            console.error('Error fetching vouchers:', error);
        }
    }

    const renderRedemptions = ({ item, index }) => {
        return <View style={{marginTop: index === 0 ? 30 : 0, marginBottom: vouchers.length === index + 1 ? 100 : 0}}><HisVoucher item={item} key={item.id} /></View>
    }

    useEffect(() => {
        fetchRedemptions();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchRedemptions();

        setTimeout(() => {

            setRefreshing(false);
        }, 1200);
    }, []);

    console.log("vouchers: ", vouchers);

    return (
        <DetailInsightsLayout pageName={"My Rewards"} showDate={false}>
            <View style={styles.container}>
                {vouchers != "" ? (
                    <FlatList
                        data={vouchers}
                        renderItem={(item) => renderRedemptions(item)}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    /> 
                ) : (
                    <View style={{ justifyContent: "center", alignItems: "center", padding: 16, height: "80%"}}>
                        <NoVoucherIcon width={100} height={100} />
                        <RegularText style={{ textAlign: "center", fontSize: 16, marginTop: 10, color: "#000" }}>
                            No Rewards found.
                        </RegularText>
                    </View>
                )}
            </View>
        </DetailInsightsLayout>
    );
};
