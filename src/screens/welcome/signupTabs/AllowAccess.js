import React, { useState }from 'react';
import { View, Image, Pressable, ScrollView } from 'react-native';
import styles from '../Welcome.styles';
import mainIcon from '../../../assets/images/maoflaamit-logo.png';
import { useSelector, useDispatch } from "react-redux";
import { saveUserStatus, fetchUserStatus } from "../../../store/reducers/userSlice";
import largeAppIcon from '../../../assets/images/largeAppIcon.png';
import { Pedometer } from 'expo-sensors';
import { useNavigation } from '@react-navigation/native';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "../../../components/AppTexts";

export default AllowAccess = () => {
    const { userStatus, loading, error } = useSelector((state) => state.user);
    const [ tab , setTab ] = useState("loginOptions");
    const [ isAllowed, setIsAllowed ] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleSkip = () => {
        navigation.navigate("PhysicalSelection");
    }

    const checkIsAvailable = async () => {
        const isAvailable = await Pedometer.isAvailableAsync();
        return isAvailable;
    }

    const getStepsAcess = async () => {
        if(checkIsAvailable()){
            const getPermission = await Pedometer.requestPermissionsAsync();
            if(getPermission.status !== "denied"){
                setIsAllowed(true);
                navigation.navigate("PhysicalSelection");
            }       
        }
    }

    return (
        <View style={styles.previewDetailsWrapper}>
            <View style={{...styles.container, marginTop: 40}}>
                <Image source={largeAppIcon} style={{...styles.mainImg, width: 140}} resizeMode="contain" />

                <View style={styles.allowAccessText}>
                    <SemiBold style={{fontSize: 22}}>Allow to access StepIt App</SemiBold>
                    <RegularText style={{textAlign: "center"}}>We will retrieve your health data to get more insights in our app</RegularText>
                </View>

                <View style={styles.allowAccessBtns}>
                    <Pressable style={{...styles.continueBtn, backgroundColor: "#2E2B53"}} onPress={getStepsAcess}>
                        <SemiBold style={{fontSize: 18, color: "#fff", textAlign: "center"}}>Allow Access</SemiBold>
                    </Pressable>
                    <Pressable onPress={handleSkip} style={styles.skipNow}>
                        <SemiBold style={{color: "#2E2B53", fontSize: 18}}>Skip for now</SemiBold>
                    </Pressable>
                </View>
            </View>
            
        </View>
    );
}