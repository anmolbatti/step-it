import React, { useEffect, useState, useRef, memo  }from 'react';
import WelcomeLayout from "../../WelcomeLayout";
import { View, Image, Pressable, TextInput, ScrollView, Platform  } from 'react-native';
import styles from '../Welcome.styles';
import mainIcon from '../../../assets/images/maoflaamit-logo.png';
import { useSelector, useDispatch } from "react-redux";
import { currentUserData, saveUserStatus } from "../../../store/reducers/userSlice";
import TabLayout from '../TabLayout';
import EditIcon from '../../../assets/icons/EditIcon';
import CloseIcon from '../../../assets/icons/CloseIcon';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import TickIcon from '../../../assets/icons/TickIcon';
import messages from '../../../utils/messages';
import { validatePasswordCharacters } from '../../../utils/functions';
import EyeIcon from '../../../assets/icons/EyeIcon';
import { publicPost, postLogin, get } from '../../../utils/axios';
import { setItem } from '../../../utils/storage';
import Counter from '../../../components/Counter';
import BackArrow from '../../../assets/icons/BackArrow';
import EyeDisabled from '../../../assets/icons/EyeDisabled';
import CalendarFieldIcon from '../../../assets/icons/CalendarFieldIcon';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "../../../components/AppTexts";

export default DetailsTab = ({changeTab}) => {
    const { userSignUpData } = useSelector((state) => state.user);
    const [ formData, setformData ] = useState({}); 
    const [ showPicker, setShowPicker ] = useState(false);
    const [ datePickerDate, setDatePickerDate ] = useState();
    const [ isOtpError, setIsOtpError ] = useState(false);

    const [ showPass, setShowPass ] = useState(true);
    

    const [ isBtnDisable, setIsBtnDisable ] = useState(true);
    const [ validationError, setValidationError ] = useState("");
    const [ errors, setErrors ] = useState();

    // const [ otpCount, setOtpCount] = useState(30);

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const continueToApp = async () => {
        try {
            setIsBtnDisable(true);
            setIsOtpError(false);
            
            var dob = formData.dob.replace("/", "-").replace("/", "-");
            const register = await publicPost("register/", {
                // email: formData.email,
                code: formData.otp,
                name: formData.name,
                username: formData.username,
                password: formData.password,
                dob: dob
            });

            console.log("user registered: ", register);
            console.log("Payload Data : ", formData);

            try {
                var loginEmail = formData.email;

                var login = await postLogin("login/", {
                    "email": loginEmail,
                    "password": formData.password
                });
    
                if(login?.access){
                    setItem("accessToken", login.access)
                    setItem("refreshToken", login.refresh)

                    try {
                        const userData = await get("profile/");

                        console.log("userData: ", userData);
                        
                        var payloadProfile = {
                          ...userSignUpData,
                          "userLoginData": userData
                        }
                        
                        dispatch(currentUserData(payloadProfile))
                        
    
                        navigation.navigate('WelcomeLoader');

                    } catch (profileErr) {
                        console.log(profileErr);
                  
                    }

                }else{
                    setIsBtnDisable(false);
                    setValidationError(messages.SOMETHING_WENT_WRONG);
                }
            } catch (loginErr) {
                setIsBtnDisable(false);
                if (loginErr.response && loginErr.response.data && loginErr.response.data.message) {
                    setValidationError(loginErr.response.data.message);
                } else {
                    setValidationError(messages.SOMETHING_WENT_WRONG);
                }
            }

        } catch (error) {
            setIsBtnDisable(false);
            if (error.response && error.response.data && error.response.data.message) {
                console.log("error?.response?.data?.error_code: ", error?.response?.data?.error_code);

                if(error?.response?.data?.error_code && error?.response?.data?.error_code === "CODE_NOT_FOUND"){
                    setIsOtpError(true);
                }

                setValidationError(error.response.data.message);
            } else {
                setValidationError(messages.SOMETHING_WENT_WRONG);
            }
            return;
        }

    }

    const handleEditEmail = () => {
        changeTab("emailTab");
    }

    const goBackToEmail =() => {
        changeTab("emailTab");
    }

    const toggleShowPassword = () => {
        showPass ? setShowPass(false) : setShowPass(true);
    }

    const handleInputChange = (key, value) => {
        try {

            setValidationError("");
            setIsOtpError(false);
            
            if(key === "password"){
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
            }
            
            setformData({
                ...formData,
                [key]: value
            });

        } catch (err) {
            setValidationError(err);
        }
    }

    const onDateChange = (key, value) => {
        if (value.type === 'set') {
            let pickerTimeStamp = value.nativeEvent.timestamp;
            setDatePickerDate(new Date(pickerTimeStamp));
            
            const pickerDate = new Date(pickerTimeStamp).toLocaleDateString('zh-Hans-CN');
            setformData({
                ...formData,
                [key]: pickerDate
            });
        }

        if(Platform.OS !== 'ios'){
            setShowPicker(false);
        }
    }
    
    const showDatePicker = () => {
        setShowPicker(true);
    }

    useEffect(() => {
        setformData(userSignUpData);
    }, []);

    useEffect(() => {
        dispatch(currentUserData(formData));

        if(formData?.name && formData?.username && formData?.password && formData?.dob && formData?.otp && errors?.passlength === false && errors?.passSpecial === false){
            setIsBtnDisable(false);
        }else{
            setIsBtnDisable(true);
        }

    }, [formData]);

    return (
        <TabLayout showIcon={false} tabsGap={10} additionalStyle={{flex: 1, justifyContent: "center"}}>
            <View style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                <Pressable onPress={goBackToEmail}>
                    <BackArrow />
                </Pressable>
                <SemiBold style={{fontSize: 21}}>Join as a new member</SemiBold>
            </View>
            <View>
                <RegularText>We have sent a code to: </RegularText> 
                <View>
                    <Pressable onPress={handleEditEmail} style={styles.location}> 
                        <MediumText>{formData.email}</MediumText>
                        <EditIcon />
                    </Pressable>
                </View>
            </View>

            <View>
                {(formData?.otp && formData?.otp !== undefined) && (
                    <RegularText style={styles.label}>Code</RegularText>
                )}

                <TextInput 
                    style={{...styles.inputCode, paddingTop: (formData?.otp && formData?.otp !== undefined) ? 22 : 12, paddingBottom: (formData?.otp && formData?.otp !== undefined) ? 4 : 12}}
                    placeholder='Input code'
                    onChangeText={(value) => handleInputChange("otp", value)}
                    value={formData?.otp}
                    allowFontScaling={false}
                />

                    {
                        isOtpError && (
                        <RegularText style={styles.validationError}>
                            {validationError}
                        </RegularText>
                        )
                    }

            </View>
            
            <Counter email={formData.email} />

            <View>
                {(formData?.name && formData?.name !== undefined) && (
                    <RegularText style={styles.label}>Name</RegularText>
                )}
                <TextInput 
                    style={{...styles.inputStyle, paddingTop: (formData?.name && formData?.name !== undefined) ? 22 : 12, paddingBottom: (formData?.name && formData?.name !== undefined) ? 4 : 12}}
                    placeholder='Name'
                    onChangeText={(value) => handleInputChange("name", value)}
                    value={formData?.name}
                    allowFontScaling={false}
                />

            </View>

            <View>
                {(formData?.username && formData?.username !== undefined) && (
                    <RegularText style={styles.label}>Username</RegularText>
                )}
                <TextInput 
                    style={{...styles.inputStyle, paddingTop: (formData?.username && formData?.username !== undefined) ? 22 : 12, paddingBottom: (formData?.username && formData?.username !== undefined) ? 4 : 12}}
                    placeholder='Username'
                    onChangeText={(value) => handleInputChange("username", value)}
                    value={formData?.username}
                    allowFontScaling={false}
                />
            </View>

            <View style={styles.passField}>
                {(formData?.password && formData?.password !== undefined) && (
                    <RegularText style={styles.label}>Password</RegularText>
                )}

                <TextInput 
                    style={{...styles.passInputStyle, paddingTop: (formData?.password && formData?.password !== undefined) ? 22 : 12, paddingBottom: (formData?.password && formData?.password !== undefined) ? 4 : 12}}
                    placeholder='Password'
                    onChangeText={(value) => handleInputChange("password", value)}
                    secureTextEntry={showPass}
                    value={formData?.password}
                    allowFontScaling={false}
                />

                <Pressable onPress={toggleShowPassword}>
                    {showPass ? (
                        <EyeIcon />
                    ) : (
                        <EyeDisabled />
                    )}
                </Pressable>
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

            <Pressable onPress={showDatePicker} style={{position: "relative"}}>
                {(formData?.dob && formData?.dob !== undefined) && (
                    <RegularText style={styles.label}>Date of Birth</RegularText>
                )}

                <RegularText style={{...styles.dobText, paddingTop: (formData?.dob && formData?.dob !== undefined) ? 22 : 12, paddingBottom: (formData?.dob && formData?.dob !== undefined) ? 4 : 12}}>
                    {formData?.dob ? formData.dob : "Date of Birth"}
                </RegularText>

                <View style={{position: "absolute", top: 10, right: 10}}>
                    <CalendarFieldIcon />
                </View>
                
            </Pressable>

            {showPicker === true && ( 
                <DateTimePicker 
                    display="default"
                    value={datePickerDate ? datePickerDate : new Date()} 
                    mode={'date'} 
                    onChange={(value) => onDateChange("dob", value)}
                />
            )} 

            <RegularText style={styles.validationError}>
                {
                    !isOtpError && validationError
                }
            </RegularText>
            <Pressable onPress={continueToApp} style={{...styles.continueBtn, backgroundColor: isBtnDisable ? "#A2B5D2" : "#2E2B53"}} disabled={isBtnDisable}>
                <SemiBold style={{fontSize: 18, color: "#fff", textAlign: "center"}}>Continue</SemiBold>
            </Pressable>
        </TabLayout>
    );
}