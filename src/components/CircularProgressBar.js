// CircularProgressBar.js
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import rightArrow from '../assets/images/right-arrow.png'; // Ensure the path is correct
import ShoeIcon from '../assets/icons/ShoeIcon';
import RightArrowIcon from '../assets/icons/RightArrowIcon';
import { appTypo } from '../utils/typography';
import LatherShoeIcon from '../assets/icons/LatherShoeIcon';

import shoeIcon from "../assets/images/shoeIcon.png";


const CircularProgressBar = ({ size, width, fill, icon }) => {
  const radius = (size - width) / 2;
  const center = size / 2;
  const arrowSize = 24; // Adjust this size to match your arrow image dimensions

  return (
    <View style={{ width: size, height: size, position: "relative" }}>
      <AnimatedCircularProgress
        size={size}
        width={width}
        fill={fill/110}
        tintColor={appTypo.secondaryColor}
        backgroundColor="#E4EDF7"
        rotation={0}
        lineCap="round"
        style={{zIndex: -1}}
      >
        {/* {() => (
        )} */}
      </AnimatedCircularProgress>
      <View style={styles.iconContainer}>
        {/* <LatherShoeIcon /> */}
        <Image source={shoeIcon} style={{zIndex: 999, width: 80, height: 60}} resizeMode='contain' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    top: "25%",
    left: "15%",
    zIndex: 9999,
  },
  barIcon: {
    width: 34,
    height: 34,
  },
  arrow: {
    position: 'absolute',
  },
});

export default CircularProgressBar;
