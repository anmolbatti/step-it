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
import { isEmailAddress, validatePasswordCharacters } from '../../../utils/functions';
import EyeIcon from '../../../assets/icons/EyeIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import TickIcon from '../../../assets/icons/TickIcon';
import CloseIcon from '../../../assets/icons/CloseIcon';
import BackArrow from '../../../assets/icons/BackArrow';
import EyeDisabled from '../../../assets/icons/EyeDisabled';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "../../../components/AppTexts";


export default ForgotPass = ({ changeTab }) => {
    const { userStatus, loading, error, userSignUpData  } = useSelector((state) => state.user);
    const [ userCountry, setUserCountry ] = useState("");
    const [ validationError, setValidationError ] = useState("");
    const [ email, setEmail ] = useState(userSignUpData?.email);
    const [ otp, setOtp ] = useState("");
    const [ isBtnDisable, setIsBtnDisable ] = useState(true);
    const [ showPass, setShowPass ] = useState(false);
    const [ showConfPass, setShowConfPass ] = useState(false);
    const [ currentAction, setCurrentAction ] = useState(1);
    const [ pass, setPass ] = useState("");
    const [ confirmPass, setConfirmPass ] = useState("");
    const [ errors, setErrors ] = useState();

    const dispatch = useDispatch();
    
    const sendForgotEmail = async () => {
        try {
            if(!email){
                setValidationError(messages.EMAIL_REQUIRED);
                return;
            }
    
            if(!isEmailAddress(email)){
                setValidationError(messages.EMAIL_INVALID);
                return;
            }
            
            
            var payload = {
                ...userSignUpData,
                email
            }
            
            dispatch(currentUserData(payload));
            setCurrentAction(2);

            setIsBtnDisable(true);

        } catch (err) {
            setValidationError(messages.SOMETHING_WENT_WRONG);
            return;
        }
    }

    const handleEmailChange = (value) => {
        setValidationError("");
        setEmail(value);

    }

    const handleOtpCode = (value) => {
        setOtp(value);
        setValidationError("");

        if(value !== ""){
            setIsBtnDisable(false);
        }else{
            setIsBtnDisable(true);
        }

    }

    const handlePassChange = (value) => {
        try {

            setValidationError("");
            if(value.length < 8){
                var lengthPayload = {
                    ...errors,
                    ["passlength"]: true
                }

            }else{
                var lengthPayload = {
                    ...errors,
                    ["passlength"]: false
                }
            }
            
            
            if(!validatePasswordCharacters(value)){
                lengthPayload.passSpecial = true;
            }else{
                lengthPayload.passSpecial = false;
            }
            
            setErrors(lengthPayload);
            setPass(value);

        } catch (err) {
            setValidationError(err);
        }
    }

    const handleConfirmPassChange = (value) => {
        setValidationError("");
        setConfirmPass(value);
    }

    const goBackToLogin = () => {
        changeTab("loginForm");
    }

    const updatePass = () => {
        alert("Password Changed Successfully");
    }

    const verifyOtp = () => {
        if (!otp){
            return validationError(messages.OTP_REQUIRED);
        }

        setCurrentAction(3);
        setIsBtnDisable(true);
    }

    const toggleShowPassword = () => {
        showPass ? setShowPass(false) : setShowPass(true);
    }

    const toggleShowConfPassword = () => {
        showConfPass ? setShowConfPass(false) : setShowConfPass(true);
    }

    useEffect(() => {
        if(email){
            if(isEmailAddress(email)){
                setIsBtnDisable(false);
            }else{
                setIsBtnDisable(true);
            }
        }
    }, [email]);

    useEffect(() => {
        if((pass && confirmPass) && pass === confirmPass && !errors?.passlength && !errors?.passSpecial){
                setIsBtnDisable(false);
            }else{
                setIsBtnDisable(true);
            }
    }, [pass, confirmPass]);

    return (
        <TabLayout additionalStyle={{position: "absolute"}} showFooterText={false}>
            <View style={styles.loginForm}>
                <View style={styles.loginFormFields}>
                    {currentAction === 1 && ( <>
                        <View>
                            <View style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                                <Pressable onPress={goBackToLogin}>
                                    <BackArrow />
                                </Pressable>
                                <SemiBold style={{fontSize: 21}}>Reset Password</SemiBold>
                            </View>
                            <RegularText style={{fontSize: 18}}>Enter your email to receive a code</RegularText> 
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
                                allowFontScaling={false}
                            />
                        </View>
                        <Pressable onPress={sendForgotEmail} style={{...styles.loginContinueBtn, backgroundColor: isBtnDisable ? "#A2B5D2" : "#2E2B53"}} disabled={isBtnDisable}>
                            <SemiBold style={{fontSize: 18, color: "#fff", textAlign: "center"}}>Continue</SemiBold>
                        </Pressable>
                    </> )}

                    {currentAction === 2 && ( <>
                        <View>
                            <SemiBold style={{fontSize: 21}}>Code confirmation</SemiBold>
                            <RegularText style={{fontSize: 18}}>We sent a code to your Email</RegularText> 
                        </View>
                        <View>

                            {(otp && otp !== undefined) && (
                                <RegularText style={styles.label}>Code</RegularText>
                            )}
                            <TextInput 
                                style={{...styles.inputStyle, paddingTop: (otp && otp !== undefined) ? 22 : 12, paddingBottom: (otp && otp !== undefined) ? 4 : 12}}
                                placeholder='Input code'
                                onChangeText={value  => handleOtpCode(value)}
                                value={otp}
                                allowFontScaling={false}
                            />

                        </View>

                        <Pressable onPress={verifyOtp} style={{...styles.loginContinueBtn, backgroundColor: isBtnDisable ? "#A2B5D2" : "#2E2B53"}} disabled={isBtnDisable}>
                            <SemiBold style={{fontSize: 18, color: "#fff", textAlign: "center"}}>Continue</SemiBold>
                        </Pressable>
                    </> )}

                    {currentAction === 3 && ( <>
                        <View>
                            <SemiBold style={{fontSize: 21}}>Create Password</SemiBold>
                            <RegularText style={{fontSize: 18}}>Create your new password to get started</RegularText> 
                        </View>
                        
                        <View style={styles.confirmPassFields}>
                            <View style={{flexDirection: "column", gap: 20}}>
                                <View style={styles.passField}>
                                    {(pass && pass !== undefined) && (
                                        <RegularText style={styles.label}>Password</RegularText>
                                    )}

                                    <TextInput 
                                        style={{...styles.passInputStyle, paddingTop: (pass && pass !== undefined) ? 22 : 12, paddingBottom: (pass && pass !== undefined) ? 4 : 12}}
                                        placeholder='Password'
                                        onChangeText={value  => handlePassChange(value)}
                                        value={pass}
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

                                <View style={styles.passField}>
                                    {(confirmPass && confirmPass !== undefined) && (
                                        <RegularText style={styles.label}>Confirm Password</RegularText>
                                    )}

                                    <TextInput 
                                        style={{...styles.passInputStyle, paddingTop: (confirmPass && confirmPass !== undefined) ? 22 : 12, paddingBottom: (confirmPass && confirmPass !== undefined) ? 4 : 12}}
                                        placeholder='Confirm Password'
                                        onChangeText={value  => handleConfirmPassChange(value)}
                                        value={confirmPass}
                                        secureTextEntry={showConfPass ? false : true}
                                        allowFontScaling={false}
                                    />

                                    <Pressable onPress={toggleShowConfPassword}>
                                        {showConfPass ? (
                                            <EyeDisabled />
                                        ) : (
                                            <EyeIcon />
                                        )}
                                    </Pressable>
                                </View>
                            </View>

                            <View style={styles.validationTexts}>
                        
                                {(errors?.passlength || errors?.passlength === undefined) ? ( 
                                    <CloseIcon width={8} />
                                    ) : (
                                        <TickIcon />
                                )}

                                <RegularText>Minimum of 8 characters</RegularText>
                            </View>

                            <View style={styles.validationTexts}>
                                {(errors?.passSpecial || errors?.passSpecial === undefined) ? ( 
                                    <CloseIcon width={8} />
                                    ) : (
                                        <TickIcon />
                                        )}
                                <RegularText>Including uppercase, lowercase, and number</RegularText>
                            </View>
                        </View>

                        <Pressable onPress={updatePass} style={{...styles.loginContinueBtn, backgroundColor: isBtnDisable ? "#A2B5D2" : "#2E2B53"}} disabled={isBtnDisable}>
                            <SemiBold style={{fontSize: 18, color: "#fff", textAlign: "center"}}>Continue</SemiBold>
                        </Pressable>
                    </> )}
                </View>
            </View>
        </TabLayout>
    );
}