import React, { useState, useEffect }from 'react';
import WelcomeLayout from "../WelcomeLayout";
import { View, Image, Pressable, ScrollView } from 'react-native';
import styles from './Welcome.styles';
import mainIcon from '../../assets/images/maoflaamit-logo.png';
import { useSelector, useDispatch } from "react-redux";
import { saveUserStatus, fetchUserStatus } from "../../store/reducers/userSlice";
import EmailTab from './signupTabs/EmailTab';
import DetailsTab from './signupTabs/DetailsTab';
import LoginForm from './loginTabs/LoginForm';
import ForgotPass from './loginTabs/ForgotPass';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "../../components/AppTexts";

export default Welcome = () => {
    const { userStatus, loading, error } = useSelector((state) => state.user);
    const [ tab , setTab ] = useState("loginOptions");
    const dispatch = useDispatch();
    // const [ otpCount, setOtpCount] = useState(30);

    const handleJoinNow = () => {
        setTab("emailTab");
    }

    const handleLogin = () => {
        setTab("loginForm");
    }

    const changeTab = (tabName) => {
        setTab(tabName);
    }

    const handleSkip = () => {
        dispatch(saveUserStatus(true));
    }

    // useEffect(() => {
    //     setTab("otherDetails");
    // }, []);

    return (
        <WelcomeLayout>
            {tab === "loginOptions" && (
                <View style={styles.container}>
                    <Image source={mainIcon} style={styles.mainImg} resizeMode="contain" />

                    <View style={styles.loginBtns}>
                        <Pressable onPress={handleJoinNow} style={styles.joinNow}>
                            <SemiBold>Join now</SemiBold>
                        </Pressable>

                        <Pressable onPress={handleLogin} style={styles.loginBtn}>
                            <SemiBold style={{color: "#ffff"}}>Login</SemiBold>
                        </Pressable>

                        {/* <Pressable onPress={handleSkip} style={styles.skipNow}>
                            <SemiBold style={{color: "#ffff", fontSize: 18}}>Skip for now</SemiBold>
                        </Pressable> */}
                    </View>
                </View>
            )}
            
            {tab === "emailTab" && (
                <View style={styles.container}>
                    <EmailTab changeTab={changeTab} />
                </View>
            )}
            

            {tab === "otherDetails" && (
                <View style={styles.container}>
                    <DetailsTab changeTab={changeTab} />
                </View>
            )}

            {tab === "loginForm" && (
                <View style={styles.container}>
                    <LoginForm changeTab={changeTab} />
                </View>
            )}

            {tab === "forgotPass" && (
                <View style={styles.container}>
                    <ForgotPass changeTab={changeTab} />
                </View>
            )}
        </WelcomeLayout>
    );
}