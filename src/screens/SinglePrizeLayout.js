import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable, StatusBar, Modal, Image, Dimensions, Platform, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import typography from "../utils/typography";
import CoinIcon from '../assets/icons/CoinIcon';
import PaymentAppIcon from '../assets/icons/PaymentAppIcon';
import PaymentIcon from '../assets/icons/PaymentIcon';
import { useSelector, useDispatch } from 'react-redux';
import PulseCheckIcon from '../assets/icons/PulseCheck';
import SwipeUpDown from 'react-native-swipe-up-down';
import { TopHeadingRedemption, CenterContentRedemption } from "./singlePrize/OnVoucherRedeem";
import BigCoinIcon from '../assets/icons/BigCoinIcon';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText
} from "../components/AppTexts";

const SinglePrizeLayout = ({ children, pageName, coins, cash, title, image, handleRedeemVoucher }) => {
    const { userCoins, userSignUpData } = useSelector((state) => state.user);
    const navigation = useNavigation();
    const [firstModalVisible, setFirstModalVisible] = useState(false);
    const [secondModalVisible, setSecondModalVisible] = useState(false);
    const [isPurchased, setIsPurchased] = useState(false);
    const [showRedemeed, setShowRedemeed] = useState(false);
    const swipeUpDownRef = useRef(null);
    const [isFull, setIsFull] = useState(false);

    const toggleSwipeUpDown = () => {
        setShowRedemeed(false);
    };

    const handlePress = () => {
        setFirstModalVisible(true);
    };

    const closeModal = () => {
        setFirstModalVisible(false);
    };

    const handleConfirmPress = () => {
        setFirstModalVisible(false);
        setSecondModalVisible(true);
    };

    const closeConfirmModal = () => {
        setSecondModalVisible(false);
    };

    const closeReviewModal = () => {
        setShowRedemeed(false);
    }

    const navigateToHome = () => {
        navigation.navigate("Home");
    }


    useEffect(() => {
        if(isPurchased) {
            setSecondModalVisible(false);
            setIsPurchased(false);
            
            if (swipeUpDownRef.current) {
                swipeUpDownRef.current.showFull();
            }

            setShowRedemeed(true);
            
        }
    }, [isPurchased])

    // console.log("isPurchased: ", isPurchased);
    // console.log("showredemed: ", showRedemeed);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsPurchased(true);
    //     }, 2000)
    // }, [])

    // const handlePayPress = async () => {
    //     const methodData = [{
    //         supportedMethods: ['apple-pay'],
    //         data: {
    //             merchantIdentifier: 'your.merchant.identifier', // Replace with your Apple merchant identifier
    //             supportedNetworks: ['visa', 'mastercard', 'amex'],
    //             countryCode: 'US',
    //             currencyCode: 'USD',
    //             paymentMethodTokenizationParameters: {
    //                 parameters: {
    //                     gateway: 'stripe', // or other payment gateway
    //                     'stripe:publishableKey': 'your-stripe-publishable-key', // Replace with your Stripe publishable key
    //                 }
    //             }
    //         }
    //     }];

    //     const details = {
    //         id: 'basic-example',
    //         displayItems: [
    //             {
    //                 label: title,
    //                 amount: { currency: 'USD', value: cash }
    //             }
    //         ],
    //         total: {
    //             label: 'Total',
    //             amount: { currency: 'USD', value: cash }
    //         }
    //     };

    //     try {
    //         const paymentRequest = new PaymentRequest(methodData, details);
    //         const paymentResponse = await paymentRequest.show();
    //         console.log('Payment Successful:', paymentResponse);
    //         paymentResponse.complete('success');
    //     } catch (error) {
    //         console.error('Payment failed:', error);
    //     }
    // };

    return (
        <>
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <StatusBar
                animated={true}
                backgroundColor="#ffff"
                barStyle="dark-content"
            />
            <View style={styles.container}>
                <View style={styles.content}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        {children}
                    </ScrollView>

                    <View style={styles.redeemPrizeBtn}>
                        <Pressable
                            style={{
                                ...typography.commonBtn,
                                paddingVertical: 16,
                                paddingHorizontal: 40,
                                borderRadius: 100,
                                marginTop: 10,
                                backgroundColor: "#E53C6B"
                            }}
                            onPress={handlePress}
                        >
                            <SemiBold style={styles.convertBtnText}>
                                <MediumText> Redeem for {parseInt(cash) > 0 ? `$${cash} + ` : "" }</MediumText>
                                <View><CoinIcon height={18} width={18} /></View>
                                <MediumText>{coins}</MediumText>
                            </SemiBold>
                        </Pressable>
                    </View>
                </View>
            </View>

            {/* First Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={firstModalVisible}
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={closeModal} >
                    <View style={styles.modalOverlay}>
                    {coins > userCoins ? (
                        <View style={{...styles.modalContent}}>
                            <View style={{flexDirection: "column", gap: 22, paddingHorizontal: 10}}>
                                <SemiBold style={{fontSize: 20, textAlign: "center"}}>Sorry you don’t have enough coins to redeem this prize</SemiBold>

                                <RegularText style={{fontSize: 18   , textAlign: "center"}}>Let’s keep walking and convert more steps into coins!</RegularText>

                                <View style={{backgroundColor: "#E4EDF7", borderRadius: 8, flexDirection: "row", paddingVertical: 16, alignItems: "center"}}>
                                    <View>
                                        <BigCoinIcon height={35} width={81}/>
                                    </View>
                                    <View>
                                        <RegularText>Did you know?</RegularText>
                                        <SemiBold>1,100 steps = 1 coin</SemiBold>
                                    </View>
                                </View>

                                <Pressable onPress={navigateToHome} style={{...typography.commonBtn, paddingVertical: 14, borderRadius: 100}}>
                                    <SemiBold style={{color: "#fff", fontSize: 18}}>Let’s walk more</SemiBold>
                                </Pressable>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalText}>
                                    <SemiBold style={{ fontSize: 25 }}>Purchase</SemiBold>
                                </Text>
                                <Pressable
                                    style={styles.closeButton}
                                    onPress={closeModal}
                                >
                                    <MediumText style={styles.closeButtonText}>Cancel</MediumText>
                                </Pressable>
                            </View>
                            <View style={styles.imageAndText}>
                                <Image source={{ uri: image }} style={styles.imageStyle} />
                                <MediumText style={{...styles.titleStyle, fontSize: 20}}>
                                    {title}
                                </MediumText>
                            </View>
                            <View style={styles.redeemPrizeBtn}>
                                <Pressable
                                    style={{
                                        ...typography.commonBtn,
                                        paddingVertical: 16,
                                        paddingHorizontal: 40,
                                        borderRadius: 100,
                                        marginTop: 40,
                                        marginBottom: 0,
                                        backgroundColor: userCoins < coins ? "#f1aabe" : "#E53C6B"
                                    }}
                                    onPress={handleConfirmPress} // Open second modal on confirm press
                                    disabled={userCoins < coins ? true : false}
                                >
                                    <View style={{...styles.convertBtnText, flexDirection: "row",gap: 2,alignItems: "center"}}>
                                        <SemiBold style={{...styles.convertBtnText}}> Confirm for {parseInt(cash) > 0 ? `$${cash} + ` : "" }</SemiBold>
                                        <View><CoinIcon height={18} width={18} /></View>
                                        <SemiBold style={{...styles.convertBtnText}}>{coins}</SemiBold>
                                    </View>
                                </Pressable>
                                <View style={styles.remainingBalanceContainer}>
                                    <MediumText style={styles.remainingBalanceText}>Your coin balance: </MediumText>
                                    <View style={{marginTop: 12}}><CoinIcon height={18} width={18} /></View>
                                    <MediumText style={styles.remainingBalanceText}>
                                        {/* {userCoins - coins > 0 ? userCoins - coins : 0} */}
                                        {userCoins}
                                        </MediumText>
                                </View>
                            </View>
                        </View>
                    )}
                        

                        
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Second Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={secondModalVisible}
                onRequestClose={closeConfirmModal}
            >
                <TouchableWithoutFeedback onPress={closeConfirmModal} >
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContent, styles.setModelBorder]}>
                            <View style={styles.modalHeader}>
                                <Pressable
                                    style={[styles.closeButton, styles.closeButton]}
                                    onPress={closeConfirmModal}
                                >
                                    <RegularText style={styles.closeButtonText}>Cancel</RegularText>
                                </Pressable>
                            </View>
                            <BoldText style={styles.applePayText}>{Platform.OS === "ios" ? "Apple Pay" : "Pay"}</BoldText>
                            <View style={styles.iconTextContainer}>
                                {/* Icon before both title and step text */}
                                <PaymentAppIcon style={styles.iconStyle} />
                                <View style={{width: "90%"}}>
                                    <BoldText style={{...styles.titleStyle, lineHeight: 26}}>{title}</BoldText>
                                    <RegularText style={styles.stepItText}>Step it-Convert your steps to coins</RegularText>
                                </View>
                            </View>
                            <View style={{alignItems: "left", flexDirection: "column", gap: 22, paddingVertical: 20, paddingHorizontal: 10}}>
                                <View style={styles.detailsText}>
                                    <RegularText style={{width: "18%", color: "#8A8A8E"}}>DETAILS</RegularText>   
                                    <RegularText>The voucher code will be sent to your email</RegularText>
                                </View>

                                <View style={styles.accountText}>
                                    <RegularText style={{width: "18%", color: "#8A8A8E"}}>ACCOUNT</RegularText>   
                                    <RegularText>{userSignUpData?.userLoginData?.email}</RegularText>
                                </View>

                                <View style={styles.priceText}>
                                    <RegularText style={{width: "18%", color: "#8A8A8E"}}>PRICE</RegularText>
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <RegularText>{parseInt(cash) > 0 ? `$${cash} +` : "" } </RegularText>
                                        <CoinIcon height={18} width={18} />
                                        <RegularText>{coins}</RegularText>
                                    </View>
                                </View>

                            </View>
                            <View style={{flexDirection: "column", alignItems: "center"}}>
                                <Pressable onPress={() => handleRedeemVoucher(setIsPurchased)} style={{flexDirection: "column", alignItems: "center"}}>
                                    <PaymentIcon style={styles.confirmIconStyle} />
                                    <RegularText style={styles.confirmSideButton}>Confirm with side button</RegularText>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>


            <Modal
                animationType="fade"
                transparent={true}
                visible={isPurchased}
                onRequestClose={closeConfirmModal}
            >
                <TouchableWithoutFeedback onPress={closeConfirmModal} >
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContent, styles.setModelBorder]}>
                            <View style={styles.modalHeader}>
                                <SemiBold style={{fontSize: 20}}>Purchase</SemiBold>
                            </View>

                            <View style={{alignItems: "center", flexDirection: "column", gap: 22, paddingVertical: 20, paddingHorizontal: 10, justifyContent: "center"}}>
                                <PulseCheckIcon />
                                <SemiBold style={{fontSize: 20}}>Purchased successfully!</SemiBold>
                                <RegularText>The voucher will be sent to your email.</RegularText>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={showRedemeed}
                onRequestClose={closeReviewModal}
            >
                {/* <TouchableWithoutFeedback onPress={closeReviewModal} > */}
                    <View style={styles.modalOverlay}>
                        {/* <TopHeadingRedemption toggleSwipeUpDown={toggleSwipeUpDown} /> */}
                        <CenterContentRedemption image={image} toggleSwipeUpDown={toggleSwipeUpDown} />
                    </View>
                {/* </TouchableWithoutFeedback> */}
            </Modal>
        
            {/* { showRedemeed && (
                <SwipeUpDown
                    ref={swipeUpDownRef}
                    itemMini={() => <TopHeadingRedemption toggleSwipeUpDown={toggleSwipeUpDown} />}
                    itemFull={() => <CenterContentRedemption image={image} toggleSwipeUpDown={toggleSwipeUpDown} />}
                    animation="spring"
                    disableSwipeIcon
                    extraMarginTop={100}
                    iconColor='yellow'
                    iconSize={30}
                    style={{ backgroundColor: '#fff', top: 1 }}
                />
            )} */}
        </SafeAreaView>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
    content: {
        flex: 1,
        backgroundColor: '#E4EDF7',
    },
    scrollContainer: {
        // paddingBottom: 100,
    },
    redeemPrizeBtn: {
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 4,
        paddingHorizontal: 20,
        paddingBottom: 24,
        backgroundColor: "#fff",
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    convertBtnText: {
        fontSize: 18,
        lineHeight: 20,
        fontWeight: '700',
        letterSpacing: 0.35,
        color: 'white',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 20 
    },
    modalHeader: {
        width: '100%',
        alignItems: 'center',
        position: 'relative',
    },
    modalText: {
        fontSize: 25,
        marginTop: 10,
        marginBottom: 20
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        borderRadius: 80,
        backgroundColor: '#E4EDF7',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
    },
    closeButtonText: {
        color: '#43506C',
        fontSize: 16,
    },
    remainingBalanceContainer: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 40,
        display: 'flex',
        justifyContent: 'center',
    },
    remainingBalanceText: {
        fontSize: 16,
        marginTop: 10,
        paddingLeft: 2,
    },
    imageStyle: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 16,
        // marginTop: 20,
    },
    titleStyle: {
        flexShrink: 1
    },
    confirmIconStyle: {
        marginBottom: 10,
        width: 40,  // Adjust width as needed
        height: 40, // Adjust height as needed
        marginRight: 250,
    },

    applePayText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        marginRight: 250,
        color: '#333',
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 30,
        gap: 20
    },
    iconStyle: {
        width: "18%",  // Adjust width as needed
        // height: 30, // Adjust height as needed
        // marginRight: 10, // Adjust margin as needed
    },
    stepItText: {
        fontSize: 14,
        color: '#333',
    },
    detailsText: {
        flexDirection: "row",
        gap: 20,
        fontSize: 15,
        textAlign: "left",
        color: '#333',
    },
    accountText: {
        fontSize: 15,
        textAlign: "left",
        flexDirection: "row",
        gap: 20,
        // width: "auto",
        // marginTop: 30,
        color: '#333',
    },
    priceText: {
        fontSize: 15,
        flexDirection: "row",
        gap: 20,
        textAlign: "left",
        // marginTop: 30,
        color: '#333',
    },
    confirmSideButton: {
        fontSize: 15,
        marginTop: 15,
        color: '#333',
    },
    simpleButton: {
     backgroundColor: 'transparent',
    },
    simpleButtonText: {
        color: '#007AFF',
        fontSize: 16,
    },
    imageAndText: {
        flexDirection: "row", 
        alignItems: "center", 
        gap: 14, 
        borderBottomWidth: 1, 
        paddingBottom: 26, 
        flexShrink: 1,
        position: "relative",
        // paddingHorizontal: 20, 
        borderColor: "#E4EDF7"
    }
});

export default SinglePrizeLayout;
