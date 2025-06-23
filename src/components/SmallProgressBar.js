// CircularProgressBar.js
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import rightArrow from '../assets/images/right-arrow.png'; // Ensure the path is correct

const SmallProgressBar = ({ size, width, fill=50, maxSteps=11000 }) => {
  const radius = (size - width) / 2;
  const center = size / 2;
  const arrowSize = 24;

  return (
    <View style={{ width: size, height: size }}>
      <AnimatedCircularProgress
        size={size}
        width={width}
        fill={fill/(maxSteps/100)}
        tintColor="#E86051"
        backgroundColor="#E4EDF7"
        rotation={0}
        lineCap="round"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barIcon: {
    width: 34,
    height: 34,
  },
  arrow: {
    position: 'absolute',
  },
});

export default SmallProgressBar;
