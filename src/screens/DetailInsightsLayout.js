import React from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable , StatusBar} from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";
import BackBtnIcon from '../assets/icons/BackBtnIcon';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "../components/AppTexts";

export default DetailInsightsLayout = ({ children, pageName, showDate=true }) =>{
    const navigation = useNavigation();

    const getDate = () => {
        const date = new Date();
        const monthArr = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
        var day = date.getDate();
        var month = monthArr[date.getMonth()];
        var year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    const goBack = () => {
        navigation.goBack();
    }

    return (<>
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <StatusBar
                    animated={true}
                    backgroundColor="#ffff"
                    barStyle="dark-content"
                />
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Pressable onTouchStart={goBack} onPress={goBack} style={styles.backBtn}>
                                {/* <View style={styles.backBtn}> */}
                                    <BackBtnIcon />
                                {/* </View> */}
                            </Pressable>
                            <View style={styles.headerText}>
                                <SemiBold style={styles.pageName}>{pageName}</SemiBold>
                                {showDate && (
                                    <RegularText style={{color: "#2E2B53", fontSize: 16}}>{getDate()}</RegularText>
                                )}
                            </View>
                        </View>
                        
                        {children}
                        
                    </View>
                </View>
            </SafeAreaView>
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
        paddingBottom: 12,
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
        alignItems: "center",
        paddingBottom: 6
    },
    backBtn: {
        position: "absolute",
        top: 0,
        left: 8,
        padding: 10,
        zIndex: 9999
    }, 
    pageName: {
        fontSize: 20,
        fontWeight: "600",
        color: "#0C1433",
    },   
    scrollContainer: {
        paddingBottom: 80,
        paddingTop: 20,
        paddingHorizontal: 12
    }
});