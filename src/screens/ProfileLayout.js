import React from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable, StatusBar } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "../components/AppTexts";

export default ProfileLayout = ({ children, pageName }) =>{
    const navigation = useNavigation();

    return (
        <>
        {/* <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}> */}
            <StatusBar
                animated={true}
                backgroundColor="#ffff"
                barStyle="dark-content"
            />
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={styles.headerText}>
                            <SemiBold style={styles.pageName}>{pageName}</SemiBold>
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        {children}
                    </ScrollView>
                </View>
            </View>
        {/* </SafeAreaView> */}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      backgroundColor: '#E4EDF7',
    },
    header: {
        flexDirection: "row",
        paddingTop: 8,
        paddingBottom: 18, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        alignItems: "center",
        position: "relative",
    },
    headerText: {
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        color: "#2E2B53",        
        textAlign: "center",        
        flex: 1,
        textAlign: "center",
        alignItems: "center"
    },
    pageName: {
        fontSize: 21,
        fontWeight: "700",
        color: "#0C1433",
    },   
    scrollContainer: {
        paddingBottom: 80,
        paddingTop: 30,
        paddingHorizontal: 20
    }
});