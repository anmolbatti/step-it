import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Header from "../components/Header";
import { appTypo } from '../utils/typography';

export default Layout = ({ children }) => {
    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor={appTypo.themeColor}
                // barStyle="dark-content"
            />
            <View style={styles.container}>
                <Header />
                <View style={styles.content}>
                    {children}
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E4EDF7'
    },
    content: {
      flex: 1,
      backgroundColor: '#E4EDF7'
    }
});