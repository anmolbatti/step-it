import React, { useState }from 'react';
import WelcomeLayout from "../WelcomeLayout";
import { View, Image, Pressable, ScrollView } from 'react-native';
import styles from './Welcome.styles';
import mainIcon from '../../assets/images/maoflaamit-logo.png';
import { useSelector, useDispatch } from "react-redux";
import { saveUserStatus, fetchUserStatus } from "../../store/reducers/userSlice";
import AppIcon from '../../assets/icons/AppIcon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GoogleLogo from '../../assets/icons/GoogleLogo';
import AppleLogo from '../../assets/icons/AppleLogo';
import FacebookLogo from '../../assets/icons/FacebookLogo';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "../../components/AppTexts";

export default TabLayout = ({ children, showIcon=true, tabsGap=20, additionalStyle={}, isLogin=false, showFooterText=true }) => {
    const { userStatus, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    return (
        <View style={{...styles.tabMainWrapper, ...additionalStyle}}>
            {showIcon && (
                <AppIcon />
            )}

            <ScrollView>
                <View style={{...styles.tabContent, gap: tabsGap}}>
                    {children}
                </View>
            </ScrollView>

            {showFooterText && ( <>
                <View style={styles.bottomText}>
                    <RegularText style={{fontSize: 18}}>By continuing, I agree to the app’s</RegularText>
                    <View style={styles.privacyPolicy}>
                        <SemiBold style={{fontSize: 16, textDecorationLine: 'underline'}}>Privacy Policy</SemiBold> 
                        <RegularText style={{fontSize: 18}}> and </RegularText> 
                        <SemiBold style={{fontSize: 16, textDecorationLine: 'underline'}}>Terms of Use</SemiBold>
                    </View>
                </View>

                {/* {isLogin && (
                    <View style={styles.bottomLoginOptions}>
                        <RegularText style={{fontSize: 18, color: "#0C1433"}}>Other login method</RegularText>
                        <View style={styles.loginOptionIcons}>
                            <GoogleLogo />
                            <AppleLogo />
                            <FacebookLogo />
                        </View>
                    </View>
                )} */}
            </> )}
        </View>
    );
}