import React, { useState, useEffect, useRef }from 'react';
import WelcomeLayout from "../../WelcomeLayout";
import { View, Image, Pressable, TextInput } from 'react-native';
import styles from '../Welcome.styles';
import mainIcon from '../../../assets/images/maoflaamit-logo.png';
import { useSelector, useDispatch } from "react-redux";
import { currentUserData, saveUserStatus } from "../../../store/reducers/userSlice";
import { useNavigation } from '@react-navigation/native';
// import HelloIcon from '../../../assets/icons/HelloIcon';
import helloIcon from '../../../assets/images/helloIcon.png';
import heightWeight from '../../../assets/images/heightWight.png';
import { getItem } from '../../../utils/storage';
import { put } from '../../../utils/axios';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "../../../components/AppTexts";


export default PhysicalSelection = ({changeTab}) => {
    const { userStatus, loading, error, userSignUpData  } = useSelector((state) => state.user);
    const [ isBtnDisable, setIsBtnDisable ] = useState(true);
    const [ gender, setGender ] = useState();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [ formData, setFormData ] = useState({...userSignUpData});

    const handleGenderSelection = async (value) => {
        try{
            // console.log("formData.email: ", formData);
            const updateUser = await put(`users/${userSignUpData?.userLoginData ? userSignUpData?.userLoginData?.id + "/" : ""}`, 
                {
                    "email": formData.userLoginData.email,
                    "gender": value
                }
            );

            setGender(value);
            setFormData({...formData, "gender": gender});

        } catch (err){
            console.log(err);
        }
    }

    const handleSkip = () => {
        dispatch(saveUserStatus(true));
    }

    const continueToApp = async () => {
        try{
            // console.log("formData.email: ", formData);
            const updateUser = await put(`users/${userSignUpData?.userLoginData ? userSignUpData?.userLoginData?.id + "/" : ""}`, 
                {
                    "email": formData.userLoginData.email,
                    "height": formData?.height,
                    "weight": formData?.weight
                }
            );

            dispatch(saveUserStatus(true));

        } catch (err){
            console.log(err);
        }
    }

    const handleInputChange = (key, value) => {
        var payload = {
            ...formData,
            [key]: value
        }

        setFormData(payload);
    }

    useEffect(() => {
        dispatch(currentUserData({...formData}));
    }, [formData]);

    return (
        <WelcomeLayout showBackground={false}>
            <View style={{...styles.container, backgroundColor: "#fff"}}>
                <View style={styles.tellUsAboutYourSelfContent}>
                    {!gender ? <Image source={helloIcon} resizeMode='contain'/> 
                                : <Image source={heightWeight} resizeMode='contain'/>}
                    
                    <SemiBold style={{fontSize: 24, lineHeight: 32}}>Tell us about yourself</SemiBold>
                    <RegularText style={{textAlign: "center"}}>
                        {!gender ? "Gender information provide more accurate tracking of health metrics." 
                                : "Height and weight data is important to get more accurate data estimations"}
                    </RegularText>

                {!gender ? ( 
                    <>
                        <Pressable 
                            onPress={() => handleGenderSelection("M")} 
                            style={{
                                ...styles.genderSelectionBtn, 
                                backgroundColor: gender === "M" ? "#2E2B53" : "#ffff"
                            }} 
                        >
                            <SemiBold style={{fontSize: 18, color: gender === "M" ? "#ffff" : "#2E2B53", textAlign: "center"}}>Men's</SemiBold>
                        </Pressable>

                        <Pressable 
                            onPress={() => handleGenderSelection("F")} 
                            style={{
                                ...styles.genderSelectionBtn, 
                                backgroundColor: gender === "F" ? "#2E2B53" : "#ffff"
                            }} 
                        >
                            <SemiBold style={{fontSize: 18, color: gender === "F" ? "#ffff" : "#2E2B53", textAlign: "center"}}>Women's</SemiBold>
                        </Pressable>

                        <Pressable 
                            onPress={() => handleGenderSelection("O")} 
                            style={{
                                ...styles.genderSelectionBtn, 
                                backgroundColor: gender === "O" ? "#2E2B53" : "#ffff"
                            }} 
                        >
                            <SemiBold style={{fontSize: 18, color: gender === "O" ? "#ffff" : "#2E2B53", textAlign: "center"}}>Would rather not say</SemiBold>
                        </Pressable>
                    </>
                ) : (
                    <>
                        <View>
                            {(formData?.height && formData?.height !== undefined) && (
                                <RegularText style={styles.label}>Height</RegularText>
                            )}

                            <TextInput 
                                style={{...styles.inputStyle, paddingTop: (formData?.height && formData?.height !== undefined) ? 22 : 12, paddingBottom: (formData?.height && formData?.height !== undefined) ? 4 : 12}}
                                placeholder='Height'
                                onChangeText={value  => handleInputChange("height", value)}
                                value={formData?.height}
                                allowFontScaling={false}
                            />
                        </View>

                        <View>
                            {(formData?.weight && formData?.weight !== undefined) && (
                                <RegularText style={styles.label}>Weight</RegularText>
                            )}
                            <TextInput 
                                style={{...styles.inputStyle, paddingTop: (formData?.weight && formData?.weight !== undefined) ? 22 : 12, paddingBottom: (formData?.weight && formData?.weight !== undefined) ? 4 : 12}}
                                placeholder='Weight'
                                onChangeText={value  => handleInputChange("weight", value)}
                                value={formData?.weight}
                                allowFontScaling={false}
                            />
                        </View>

                        <View style={styles.continueSkipBtn}>
                            <Pressable style={{...styles.continueBtn, backgroundColor: "#2E2B53"}} onPress={continueToApp}>
                                <SemiBold style={{fontSize: 18, color: "#fff", textAlign: "center"}}>Continue</SemiBold>
                            </Pressable>
                            <Pressable onPress={handleSkip} style={styles.skipNow}>
                                <SemiBold style={{color: "#2E2B53", fontSize: 18}}>Skip for now</SemiBold>
                            </Pressable>
                        </View>


                    </>
                )}
                    
                </View>
            </View>
        </WelcomeLayout>
    );
}