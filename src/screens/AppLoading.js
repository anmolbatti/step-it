import React, { useEffect, useState }from 'react';
import { View, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import sliderImg1 from '../assets/images/sliderImg1.png';
import SplashMaoflaamitIcon from '../assets/icons/SplashMaoflaamitIcon';
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const styles = StyleSheet.create({
    welcomeLoaderWrapper: {
        flex: 1,
        alignItems: "center"
    },
    welcomeLoaderImg: {
        width: "100%",
        position: "relative",
        flex: 1
    },
    splashLogo: {
        position: "absolute",
        top: screenHeight/2.35,
        paddingHorizontal: 50
    }
});

export default AppLoading = () => {
    return (
        <View style={styles.welcomeLoaderWrapper}>
            <Image source={sliderImg1} style={styles.welcomeLoaderImg} resizeMode='cover' />
            <View style={styles.splashLogo}>
                <SplashMaoflaamitIcon />
            </View>
        </View>
    );
}