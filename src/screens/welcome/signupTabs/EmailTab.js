import React, { useState, useEffect, useRef }from 'react';
import WelcomeLayout from "../../WelcomeLayout";
import { View, Image, Pressable, TextInput } from 'react-native';
import styles from '../Welcome.styles';
import mainIcon from '../../../assets/images/maoflaamit-logo.png';
import { useSelector, useDispatch } from "react-redux";
import { currentUserData } from "../../../store/reducers/userSlice";
import TabLayout from '../TabLayout';
import EditIcon from '../../../assets/icons/EditIcon';
import * as Location from 'expo-location';
import messages from '../../../utils/messages';
import { isEmailAddress } from '../../../utils/functions';
import { publicPost } from '../../../utils/axios';
import BackArrow from '../../../assets/icons/BackArrow';
import { useNavigation } from '@react-navigation/native';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "../../../components/AppTexts";


export default EmailTab = ({changeTab}) => {
    const { userStatus, loading, error, userSignUpData  } = useSelector((state) => state.user);
    const [ userCountry, setUserCountry ] = useState("");
    const [ validationError, setValidationError ] = useState("");
    const [ email, setEmail ] = useState(userSignUpData?.email);
    const [ isBtnDisable, setIsBtnDisable ] = useState(true);
    const emailInput = useRef();
    const navigation = useNavigation();

    const dispatch = useDispatch();
    
    const continueToDetails = async () => {
        try {
            if(!email){
                setValidationError(messages.EMAIL_REQUIRED);
                return;
            }
    
            if(!isEmailAddress(email)){
                setValidationError(messages.EMAIL_INVALID);
                return;
            }
            
            
            setIsBtnDisable(true);
            try {
                const sendVerification = await publicPost("verify/", {email: email});

                var payload = {
                    ...userSignUpData,
                    email
                }
                
                dispatch(currentUserData(payload));
    
                emailInput.current.blur();
                changeTab("otherDetails");

            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    setValidationError(err.response.data.message);
                } else {
                    setValidationError(messages.SOMETHING_WENT_WRONG);
                }
                return;
            }    

        } catch (err) {
            setValidationError(messages.SOMETHING_WENT_WRONG);
            emailInput.current.blur();
            return;
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
        }

        setUserCountry(countryData[0].country);
    }

    const updateBtnDisabled = ( value ) => {
        if(value){

            if(isEmailAddress(value)){
                setIsBtnDisable(false);
            }else{
                setIsBtnDisable(true);
            }
        }
    }

    const handleEmailChange = (value) => {
        setValidationError("");
        setEmail(value);

        updateBtnDisabled(value);

    }

    const goBackToLoginOptions = () => {
        changeTab("loginOptions");
    }

    useEffect(() => {
        getUserCountry();
        updateBtnDisabled(userSignUpData?.email);
        // changeTab("otherDetails");
        // navigation.navigate("PreviewDetails");
    }, []);

    return (
        <TabLayout additionalStyle={{position: "absolute"}}>
            <View style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                <Pressable onPress={goBackToLoginOptions}>
                    <BackArrow />
                </Pressable>
                <SemiBold style={{fontSize: 21}}>Enter your email to join us</SemiBold>
            </View>
            <View style={styles.location}>
                <RegularText>Your location: </RegularText> 
                <MediumText>{userCountry}</MediumText>
                <EditIcon />
            </View>

            <View>
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
                <RegularText style={styles.validationError}>{validationError}</RegularText>
            </View>

            <Pressable onPress={continueToDetails} style={{...styles.continueBtn, backgroundColor: isBtnDisable ? "#A2B5D2" : "#2E2B53"}} disabled={isBtnDisable}>
                <SemiBold style={{fontSize: 18, color: "#fff", textAlign: "center"}}>Continue</SemiBold>
            </Pressable>
        </TabLayout>
    );
}