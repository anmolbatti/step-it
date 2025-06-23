import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, StatusBar, Pressable } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RegularText, BoldText, SemiBold, MediumText,  } from "../../components/AppTexts";
import { useNavigation } from '@react-navigation/native';
 
import sliderImg1 from "../../assets/images/sliderImg1.png";
import sliderImg2 from "../../assets/images/sliderImg2.png";
import sliderImg3 from "../../assets/images/sliderImg3.png";
import sliderImg4 from "../../assets/images/sliderImg4.png";
import startingLogo from "../../assets/images/maoflaamit-logo.png";

import styles from './AppIntro.styles';

const slides = [
  {
    key: 1,
    heading: 'Stay on Track',
    text: 'Tracks your steps into coins.',
    image: sliderImg2,
    backgroundColor: '#febe29',
  },
  {
    key: 2,
    heading: 'Get Challenges',
    text: 'More active, get healthier.',
    image: sliderImg3,
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    heading: 'Insightful',
    text: 'Get to know your lifestyle.',
    image: sliderImg4,
    backgroundColor: '#febe29',
  }
];
 
export default AppIntro = ({ onDone }) => {
    const sliderRef = useRef(null);
    // const navigation = useNavigation();

    const changeTab = (key) => {
      if(key === slides.length){
        return onDone();
        // navigation.navigate("Welcome");
      }

      sliderRef.current.goToSlide(key);
      
    }

    
  const renderItem = ({ item }) => {
    return (
          // <Pressable onPress={() => changeTab(item.key)} style={styles.slide}>
            <View style={styles.slide}>
                <Image source={item.image} style={styles.image} />
                {item?.imageOver && (
                  <Image source={item.imageOver} style={styles.imageOver} resizeMode="contain" />
                )}

              <View style={styles.imageOverContent}>
                {item?.heading && (
                  <BoldText style={styles.headingText}>{item.heading}</BoldText>
                )}

                {item?.text && (
                  <SemiBold style={styles.imageText}>{item.text}</SemiBold>
                )}
              </View>
                
            </View>
          // </Pressable>
    );
  }

  const renderDoneBtn = () => {
    return (
      <View style={styles.joinNow}>
          <SemiBold>Start now</SemiBold>
      </View>
    );
  }

  return (
      <AppIntroSlider 
        renderItem={renderItem} 
        data={slides} 
        style={styles.slider} 
        onDone={onDone}
        dotStyle={styles.dotStyle} 
        activeDotStyle={styles.activeDotStyle}
        showNextButton={false} 
        showDoneButton={true}
        renderDoneButton={renderDoneBtn}
        ref={sliderRef}
      />
  );
}