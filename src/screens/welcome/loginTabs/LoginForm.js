import React, { useState, useEffect, useRef }from 'react';
import WelcomeLayout from "../../WelcomeLayout";
import { View, Image, Pressable, TextInput ,Text} from 'react-native';
import styles from '../Welcome.styles';
import mainIcon from '../../../assets/images/maoflaamit-logo.png';
import { useSelector, useDispatch } from "react-redux";
import { currentUserData, saveUserStatus } from "../../../store/reducers/userSlice";
import TabLayout from '../TabLayout';
import EditIcon from '../../../assets/icons/EditIcon';
import * as Location from 'expo-location';
import messages from '../../../utils/messages';
import { isEmailAddress } from '../../../utils/functions';
import EyeIcon from '../../../assets/icons/EyeIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { postLogin, publicInstance } from '../../../utils/axios';
import { setItem, getItem } from '../../../utils/storage';
import BackArrow from '../../../assets/icons/BackArrow';
import EyeDisabled from '../../../assets/icons/EyeDisabled';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "../../../components/AppTexts";


export default LoginForm = ({ changeTab }) => {
    const { userStatus, loading, error, userSignUpData, fetchUserStatus  } = useSelector((state) => state.user);
    const [ userCountry, setUserCountry ] = useState("");
    const [ validationError, setValidationError ] = useState("");
    const [ email, setEmail ] = useState(userSignUpData?.email);
    const [ password, setPass ] = useState("");
    const [ isBtnDisable, setIsBtnDisable ] = useState(false);
    const emailInput = useRef();
    const passInput = useRef();
    const [ showPass, setShowPass ] = useState(false);

    const dispatch = useDispatch();
    
    const handleLogin = async () => {
        try {
            if (!email) {
                setValidationError(messages.EMAIL_REQUIRED);
                return;
            }
    
            if (!password) {
                setValidationError(messages.PASS_REQUIRED);
                return;
            }
    
            if (!isEmailAddress(email)) {
                setValidationError(messages.EMAIL_INVALID);
                return;
            }

            var login = await postLogin("login/", {
                "email": email,
                "password": password
            });

            var payload = {
                ...userSignUpData,
                email,
            };

            if(login?.access){
                dispatch(currentUserData(payload));

                setItem("accessToken", login.access)
                setItem("refreshToken", login.refresh)
                dispatch(saveUserStatus(true));
            }else{
                setValidationError(messages.SOMETHING_WENT_WRONG);
            }


        } catch (error) {
            setValidationError(error?.response?.data?.detail);
        }
    }

    const getUserCountry = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
        }
    
        let location = await Location.getCurrentPositionAsync({});
        let country = "";
        if(location?.coords){
            countryData = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
            setUserCountry(countryData[0].country);
        }

    }

    const handleForgotPass = () => {
        changeTab("forgotPass");
    }

    const toggleShowPassword = () => {
        showPass ? setShowPass(false) : setShowPass(true);
    }

    const handleEmailChange = (value) => {
        setValidationError("");
        setEmail(value);
    }

    const handlePassChange = (value) => {
        setValidationError("");
        setPass(value);
    }

    const goBackToLoginOptions = () => {
        changeTab("loginOptions");
    }

    useEffect(() => {
        getUserCountry();
    }, []);

    useEffect(() => {
        if(email){

            if(isEmailAddress(email) && password != ""){
                setIsBtnDisable(false);
            }else{
                setIsBtnDisable(false);
            }
        }

    }, [email, password]);

    return (
        <TabLayout additionalStyle={{position: "absolute"}} isLogin={true}>
            <View style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                <Pressable onPress={goBackToLoginOptions}>
                    <BackArrow />
                </Pressable>
                <SemiBold style={{fontSize: 21}}>Login to your account</SemiBold>
            </View>
            <View style={styles.location}>
                <RegularText>Your location: </RegularText> 
                <MediumText>{userCountry}</MediumText>
                <EditIcon />
            </View>

            <View style={styles.loginForm}>
                <View style={styles.loginFormFields}>
                    {(email && email !== undefined) && (
                        <RegularText style={styles.label}>Email</RegularText>
                    )}
                    <TextInput 
                        style={{...styles.inputStyle, paddingTop: (email && email !== undefined) ? 22 : 12, paddingBottom: (email && email !== undefined) ? 4 : 12}}
                        placeholder='Email'
                        onChangeText={value  => handleEmailChange(value)}
                        value={email}
                        ref={emailInput}
                        allowFontScaling={false}
                    />
                    {validationError && validationError.includes('email') && (
                        <RegularText style={styles.validationError}>{validationError}</RegularText>
                    )}

                    <View style={styles.passField}>
                        {(password && password !== undefined ) && (
                            <RegularText style={styles.label}>Password</RegularText>
                        )}

                        <TextInput 
                            style={{...styles.passInputStyle, paddingTop: (password && password !== undefined) ? 22 : 12, paddingBottom: (password && password !== undefined) ? 4 : 12}}
                            placeholder='Password'
                            onChangeText={value  => handlePassChange(value)}
                            value={password}
                            secureTextEntry={showPass ? false : true}
                            allowFontScaling={false}
                        />

                        <Pressable onPress={toggleShowPassword}>
                            {showPass ? (
                                <EyeDisabled />
                            ) : (
                                <EyeIcon />
                            )}
                        </Pressable>
                        
                    </View>
                    {validationError && validationError.includes('password') && (
                        <RegularText style={styles.validationError}>{validationError}</RegularText>
                    )}

                </View>

                {validationError && !validationError.includes('email') && !validationError.includes('password') && (
                    <RegularText style={styles.validationError}>{validationError}</RegularText>
                )}

                <View style={{marginLeft: 6, marginTop: 4}}>
                    <Pressable onPress={handleForgotPass}>
                        <MediumText style={{color: "red"}}>Forgot your password?</MediumText>
                    </Pressable>
                </View>
            
            </View>

            <Pressable onPress={handleLogin} style={{...styles.loginContinueBtn, backgroundColor: isBtnDisable ? "#A2B5D2" : "#2E2B53"}} disabled={isBtnDisable}>
                <SemiBold style={{fontSize: 18, color: "#fff", textAlign: "center"}}>Continue</SemiBold>
            </Pressable>
        </TabLayout>
    );
}