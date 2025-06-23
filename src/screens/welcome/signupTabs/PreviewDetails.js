import React, { useEffect, useState, useRef }from 'react';
import { View, Image, Pressable,  } from 'react-native';
import styles from '../Welcome.styles';
import { useSelector, useDispatch } from "react-redux";
import { saveUserStatus, fetchUserStatus, currentUserData } from "../../../store/reducers/userSlice";
import DefaultAvatar from '../../../assets/icons/DefaultAvatar';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { patch } from '../../../utils/axios';
import * as FileSystem from 'expo-file-system';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "../../../components/AppTexts";

import { Pedometer } from 'expo-sensors';

export default PreviewDetails = () => {
    const { userSignUpData } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [ imagePicked, setImagePicked ]  = useState();

    const continueToAllowAccess = async () => {
        // dispatch(saveUserStatus(true));
        const getPermission = await Pedometer.getPermissionsAsync();
        if(getPermission.granted){
            navigation.navigate("PhysicalSelection");

        }else{
            navigation.navigate("AllowAccess");
        }
        
    }

    const handleDocumentPick = async () => {
        try {
          const result = await DocumentPicker.getDocumentAsync({
            type: 'image/*',
            copyToCacheDirectory: false,
          });
          
          if (result.canceled === false) {
            setImagePicked(result?.assets[0].uri);
          }
        } catch (err) {
          console.error(err);
        }
    };

    const uploadImage = async () => {
        try{
            const fileInfo = await FileSystem.getInfoAsync(imagePicked);
            if (!fileInfo.exists) {
                alert('File does not exist');
                return;
            }

            const formData = new FormData();
            formData.append('photo', {
                uri: imagePicked,
                type: 'image/jpeg',
                name: `profile-${userSignUpData?.userLoginData?.id}.jpg`,
            });

            const uploadImgRes = await patch("profile/upload-photo/", formData);

        } catch (err) {
            console.log("error uploading the image: ", err)
        }
    }

    useEffect(() => {
        if(imagePicked !== undefined) uploadImage();
        
        dispatch(currentUserData({...userSignUpData, "profileImg": imagePicked}));
    }, [imagePicked])

    return (
        <View style={styles.previewDetailsWrapper}>
            <View style={styles.previewImageData}>
                <Pressable onPress={handleDocumentPick}>
                    {imagePicked ? <Image source={{uri: imagePicked}} style={styles.profileImg} /> : <DefaultAvatar />}
                    
                </Pressable>
                <RegularText>Hi, welcome</RegularText>
                <BoldText style={{fontSize: 48, lineHeight: 48}}>{userSignUpData?.name}</BoldText>
            </View>

            <View style={styles.previewBtn}>
            <Pressable onPress={continueToAllowAccess} style={{...styles.continueBtn, backgroundColor: "#2E2B53"}}>
                    <SemiBold style={{fontSize: 18, color: "#fff", textAlign: "center"}}>Continue</SemiBold>
                </Pressable>
            </View>
        </View>
    );
}