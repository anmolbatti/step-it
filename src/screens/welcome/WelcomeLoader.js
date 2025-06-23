import React, { useEffect, useState }from 'react';
import WelcomeLayout from "../WelcomeLayout";
import { View, Image, Pressable } from 'react-native';
import styles from './Welcome.styles';
import mainIcon from '../../assets/images/maoflaamit-logo.png';
import { useSelector, useDispatch } from "react-redux";
import { saveUserStatus, fetchUserStatus } from "../../store/reducers/userSlice";
import EmailTab from './signupTabs/EmailTab';
import DetailsTab from './signupTabs/DetailsTab';
import largeAppIcon from '../../assets/images/largeAppIcon.png';
import { useNavigation } from '@react-navigation/native';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "../../components/AppTexts";

export default WelcomeLoader = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const redirectToApp = () => {
        setTimeout(() => {
            navigation.navigate('PreviewDetails');
            // dispatch(saveUserStatus(true));

        }, 1000);
    }

    useEffect(() => {
        redirectToApp();
    }, []);

    return (
        <View style={styles.welcomeLoaderWrapper}>
            <Image source={largeAppIcon} style={styles.welcomeLoaderImg} resizeMode='contain' />
        </View>
    );
}