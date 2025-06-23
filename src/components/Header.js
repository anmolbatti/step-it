import { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppIcon from '../assets/icons/AppIcon';
import CoinIcon from '../assets/icons/CoinIcon';
import VectorIcon from '../assets/icons/VectorIcon.js';
import { useSelector, useDispatch } from 'react-redux';
import { saveUserStatus, userCoins } from '../store/reducers/userSlice.js';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { get, publicPost } from '../utils/axios.js';
import { getItem, setItem } from '../utils/storage.js';
import VoucherIcon from '../assets/icons/voucherIcon';
import { appTypo } from '../utils/typography.js';
import MainAppLogo from '../assets/icons/MainAppLogo.js';

import {
    MediumText,
    SemiBold
} from "./AppTexts";

export default Header = () => {
    const getUser = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [coins, setCoins] = useState([]);
    const [redemptionCount, setRedemptionCount] = useState(0);

    const getCoins = async () => {
        try {
            const coinsRes = await get("my-coins/");
            console.log("coinsRes?.coins: ", coinsRes?.coins);
            setCoins(coinsRes?.coins);
            dispatch(userCoins(coinsRes?.coins));

        } catch (error) {
            if (error?.response?.status === 401) {
                const refreshToken = await getItem('refreshToken');

                if (refreshToken) {
                    const refreshTokenData = await publicPost("token/refresh/", { "refresh": JSON.parse(refreshToken) });

                    if (refreshTokenData?.access) {
                        setItem("accessToken", refreshTokenData?.access);
                    }
                } else {
                    dispatch(saveUserStatus(false));
                }
            }
        }
    }
    const fetchRedemptions = async () => {
        try {
            const redemptionRes = await get('redemptions/?limit=20');
            setRedemptionCount(redemptionRes.count);
        } catch (error) {
            console.error('Error fetching vouchers:', error);
        }
    }

    useEffect(() => {
        getCoins();
        fetchRedemptions();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getCoins();

        }, [getUser])
    );

    const date = new Date().getDate();

    return (

        <View style={styles.headerContainer}>
            <View style={styles.headerLeft}>
                <MainAppLogo />
                <SemiBold style={{color: "#fff", fontSize: 18}}>Hi, {getUser?.userSignUpData?.userLoginData?.name}!</SemiBold>
            </View>

            <View style={styles.headerRight}>
                <View style={styles.headerCoins}>
                    <CoinIcon />
                    <MediumText style={styles.headerText}>{coins}</MediumText>
                </View>

                <View>
                    <VectorIcon />
                </View>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 60,
        paddingVertical: 14,
        // paddingTop: 14,
        // paddingBottom: 14,
        paddingLeft: 20,
        paddingRight: 20,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 8 },
        // shadowOpacity: 0.1,
        // shadowRadius: 5,
        // elevation: 5,
        backgroundColor: appTypo.themeColor,
        zIndex: 1,
    },
    headerLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end",
        gap: 16
    },
    headerCoins: {
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: "center",
        gap: 5,
        backgroundColor: "#4E4399",
        paddingVertical: 1,
        paddingHorizontal: 2,
        borderWidth: 1,
        borderColor: '#FFFFFF33',
        borderRadius: 4
    },
    headerCalendar: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        flex: 1,
        justifyContent: "flex-end",
    },
    logoImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    coinImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    headerText: {
        fontSize: 16,
        color: '#fff',
    },
});