import React from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable, StatusBar, Image, ImageBackground } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import typography from "../utils/typography";
import coin from '../../assets/coin.png';
import welcomeBg from "../assets/images/welcomeBg.png";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "../components/AppTexts";

export default WelcomeLayout = ({ children, showBackground=true }) =>{
    const navigation = useNavigation();

    return (
        showBackground ? (
            <ImageBackground source={welcomeBg} resizeMode="cover" style={styles.image}>
                
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} >
                    {children}
                </KeyboardAwareScrollView>
                
            </ImageBackground>
        ) : (
            <View style={{flex: 1}}>
                
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} >
                    {children}
                </KeyboardAwareScrollView>
                
            </View>
        )
        
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    }
});