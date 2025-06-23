import React, { useEffect, useState, useRef, memo  }from 'react';
import { View, Image, Pressable, TextInput, ScrollView, Platform  } from 'react-native';
import { publicPost } from '../utils/axios';
import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "./AppTexts";

export default Counter = ({email}) => {
    const [ otpCount, setOtpCount] = useState(30);

    const resendCode = async () => {
        try {
            setOtpCount(30)
            const sendVerification = await publicPost("verify/resend/", {email: email});
        } catch (err){
            return;
        }
    }

    useEffect(() => {
        if(otpCount > 0){
            const interval = setInterval(() => {
                setOtpCount(otpCount - 1);
            }, 1000);
     
            return () => clearInterval(interval);
        }

    }, [otpCount]);

    return (
        otpCount===0 ? (
            <Pressable onPress={resendCode}  style={{textAlign: "right"}}>
                <RegularText style={{textAlign: "right"}}>Resend code</RegularText>
            </Pressable>
            ) : (
                <RegularText style={{textAlign: "right"}}>Resend code in {otpCount}s</RegularText>
        )
    );
}