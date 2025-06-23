import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const StepCounter = () => {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [stepCount, setStepCount] = useState(0);
  const [previousMagnitude, setPreviousMagnitude] = useState(0);
  const threshold = 0.2;

  useEffect(() => {
    Accelerometer.setUpdateInterval(100); // Update every 100ms

    const subscription = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);

      const { x, y, z } = accelerometerData;
      const magnitude = Math.sqrt(x * x + y * y + z * z);

      if (previousMagnitude !== 0 && magnitude - previousMagnitude > threshold) {
        setStepCount((prevStepCount) => prevStepCount + 1);
      }

      setPreviousMagnitude(magnitude);
    });

    return () => {
      subscription && subscription.remove();
    };
  }, [previousMagnitude]);

  return (
    <View style={styles.container}>
      <Text>Steps: {stepCount}</Text>
      <Text>Accelerometer Data:</Text>
      <Text>x: {data.x.toFixed(2)}</Text>
      <Text>y: {data.y.toFixed(2)}</Text>
      <Text>z: {data.z.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StepCounter;
