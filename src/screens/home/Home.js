import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Image, Button, Pressable, FlatList, Dimensions, ScrollView, RefreshControl, Modal, TouchableWithoutFeedback } from 'react-native';
import InfoIcon from "../../assets/icons/InfoIcon";
import CircularProgressBar from '../../components/CircularProgressBar';
import stepsImg from '../../assets/images/Steps.png';
import Voucher from "../../components/Voucher";
import Article from "../../components/Article";
import Layout from "../Layout";
import styles from "./Home.styles";
import mriImg from "../../assets/images/mri_img.jpg";
import pregImg from "../../assets/images/pregnancy.jpg";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { LinearGradient } from 'expo-linear-gradient';
import FullArticle from "../../components/FullArticle";

import { useFonts } from 'expo-font';
import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText
} from "../../components/AppTexts";

import UseModal from "../../components/UseModal";
import BigCoinIcon from "../../assets/icons/BigCoinIcon";
import Coin2Icon from "../../assets/icons/Coin2";

import typography, { appTypo } from "../../utils/typography";
import { userStatus, saveUserStatus, stepsCount } from "../../store/reducers/userSlice";
import { useSelector, useDispatch } from 'react-redux';
import { get, post } from "../../utils/axios";
import { Pedometer } from 'expo-sensors';
import ShoeIcon from "../../assets/icons/ShoeIcon";
import RightArrow from "../../assets/icons/RightArrow";
import RightArrowFull from "../../assets/icons/rightArrowFull";

export default Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { userSignUpData } = useSelector((state) => state.user);
    const [vouchers, setVouchers] = useState([]);
    const [articles, setArticles] = useState([]);
    const [isStepsConverted, setIsStepsConverted] = useState(false);
    const [convertedCoins, setConvertedCoins] = useState("");
    const [currentModalStep, setCurrentModalStep] = useState("convert");
    

    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
    const [pastStepCount, setPastStepCount] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [lastConversionStr, setLastConversionStr] = useState(false);
    
    const [userSteps, setUserSteps] = useState(0);
    const [maxSteps, setMaxSteps] = useState(0);
    const [conversionSteps, setConversionSteps] = useState(0);
    const width = Dimensions.get("screen").width;

    const dispatch = useDispatch();

    const onPress = () => {
        setCurrentModalStep("confirm");
        setIsModalOpen(true);
    }

    const onClose = () => {
        setCurrentModalStep("convert");
        setIsModalOpen(false);
        setIsStepsConverted(false);
    }

    const navigation = useNavigation();
    const openActivities = () => {
        setCurrentModalStep("convert");
        setIsModalOpen(false);
        setIsStepsConverted(false);
        navigation.navigate("DailyActivities", { userSteps, pastStepCount, maxSteps });

    }

    const openPrizes = () => {
        setCurrentModalStep("convert");
        setIsModalOpen(false);
        setIsStepsConverted(false);
        navigation.navigate("Prizes");

    }

    const openArticles = () => {
        setCurrentModalStep("convert");
        setIsModalOpen(false);
        setIsStepsConverted(false);
        navigation.navigate("Articles");

    }

    const getVouchers = async () => {
        try {
            const voucherResponse = await get("vouchers/?limit=3");
            setVouchers(voucherResponse?.results)

        } catch (error) {
            // console.log("hello error: ", error.response.status);
            if (error?.response?.status === 401) {
                dispatch(saveUserStatus(false));
            }
        }
    }

    const getArticles = async () => {
        try {
            const articlesResponse = await get("articles/?limit=3");
            setArticles(articlesResponse?.results)

        } catch (error) {
            // console.log("err.messages.message: ", error.response.data.messages[0].message);

        }
    }

    const getCoinConversions = async () => {
        try{
            const prevConversions = await get("coin-conversions/?limit=100000&page=1");
            if(prevConversions?.count > 0){
                setLastConversionStr(prevConversions?.results[prevConversions.count -1]?.created)
            }
        } catch (err) {

        }
    }

    const lastConversionDate = (dateStr) => {
        if(dateStr){

            const date = new Date(dateStr);
            const monthArr = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
            var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            var day = date.getDate();
            var month = monthArr[date.getMonth()];
            var year = date.getFullYear();
            var hours = date.getHours();
            var mins = date.getMinutes();
            var dayName = days[date.getDay()];
            var ampm = hours >= 12 ? 'pm' : 'am';
        
            return `${dayName}, ${day} ${month} ${year} at ${hours}:${mins} ${ampm}`;
        }

    }

    const subscribeStepCount = async () => {
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(String(isAvailable));

        if (isAvailable) {
            const end = new Date();
            const start = new Date();
            start.setHours(0, 0, 0, 0);
            // start.setDate(end.getDate() - 1);

            const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
            if (pastStepCountResult && pastStepCountResult.steps) {
                try {
                    try {
                        const updateSteps = await post("sync-step/", { steps: pastStepCountResult.steps });
                    } catch (error) {
                        console.log("error", error)
                    }

                    setPastStepCount(pastStepCountResult.steps);
                    // dispatch(stepsCount(pastStepCountResult.steps));

                } catch (err) {
                    console.error("API Error:", err.response?.data || err.message);
                }
            }


            return Pedometer.watchStepCount(result => {
                setCurrentStepCount(result.steps);
            });

        }
    };

    const getStepsFromDb = async () => {
        try {
            const userStepsData = await get("my-step/");
            setUserSteps(userStepsData?.daily_steps);
            setConversionSteps(userStepsData?.steps);
            setMaxSteps(userStepsData?.max_steps);
            
            dispatch(stepsCount(userStepsData?.daily_steps));
        } catch (error) {
            console.log("error", error)
        }
    }

    const viewSinglePrize = (item) => {
        const { id, name, image, description, coins, cash, thumbnail, available_to, vendor } = item;
        navigation.navigate("SinglePrize", { id, name, image, description, coins, cash, thumbnail, available_to, vendor });
    }



    const viewSingleArticle = (item) => {
        const { type, image, title, thumbnail, category, content, author, name, id, reading_time, created } = item;

        navigation.navigate("SingleArticle", { id, type, image, title, thumbnail, category, content, author, name, reading_time, created });
    }

    const screenWidth = Dimensions.get('window').width;
    const voucherItemWidth = screenWidth / 2.5;
    const arcticleItemWidth = screenWidth / 1.5;

    const renderVoucherItem = ({ item, index }) => (
        <View style={{ marginLeft: index === 0 ? 16 : 16, marginRight: vouchers.length === index + 1 ? 16 : 0, marginTop: 6 }}>
            <Voucher itemWidth={voucherItemWidth} item={item} />
        </View>
    );

    const renderArticleItem = ({ item, index }) => (
        <Pressable onPress={() => viewSingleArticle(item)}>
            <FullArticle itemWidth={arcticleItemWidth} item={item} type={"home"} />
        </Pressable>
    );

    const confirmConvertSteps = () => {
        setIsModalOpen(false);
        // setCurrentModalStep("confirm");

        // setTimeout(() => {
        //     setIsModalOpen(true);
        // }, 500);
    }

    const formatNumberToK = (number) => {
        if (number >= 1000) {
            const thousands = Math.floor(number / 1000);
            const remainder = number % 1000;
            
            if (remainder === 0) {
                return `${thousands}k`;
            } else {
                return `${thousands},${Math.floor(remainder / 100)}k`;
            }
        } else {
            return number.toString();
        }
    };

    const convertStepsToCoins = async () => {
        try {
            const converted = await post("convert/", { steps: conversionSteps });
            setIsModalOpen(false);

            setCurrentModalStep("success");
            setTimeout(() => {
                setIsModalOpen(true);
            }, 500);

            setConvertedCoins(converted?.coin);
            getStepsFromDb();

        } catch (error) {
            alert(error?.response?.data?.message);
        }
    }

    const openInfoModal = () => {
        setCurrentModalStep("convert")
        setIsModalOpen(true);
    }

    useEffect(() => {
        getVouchers();
        getArticles();
        subscribeStepCount();
        getStepsFromDb();
        getCoinConversions();
        // lastConversionDate()
        // navigation.navigate("PhysicalSelection");
    }, []);

    useFocusEffect(
        useCallback(() => {
            subscribeStepCount();
            getStepsFromDb();
        }, [])
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        getVouchers();
        getArticles();
        subscribeStepCount();
        getStepsFromDb();
        getCoinConversions();
        // lastConversionDate()

        setTimeout(() => {
            setRefreshing(false);
        }, 1200);
    }, []);
    const remainingSteps = maxSteps - conversionSteps; // Calculate the remaining steps

    return (
        <Layout>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.homeContent}>
                        {currentModalStep === "convert" && (
                        <UseModal isModalOpen={isModalOpen} onClose={onClose}>
                                <View style={styles.modalContainer}>
                                    <SemiBold style={{ fontSize: 22, textAlign: "center", fontWeight: "600", color: "#0C1433" }}>Convert your steps into coins</SemiBold>

                                    <BigCoinIcon />
                                    <RegularText style={{ fontSize: 18 }}>Did you know?</RegularText>
                                    <SemiBold style={{ fontSize: 20 }}>{(maxSteps/10).toLocaleString("en-US")} steps = 1 coin</SemiBold>
                                    <RegularText style={{ textAlign: "center", fontSize: 16 }}>Use your coins to redeem discounts or products at rewards menu.</RegularText>

                                    <Pressable onPress={confirmConvertSteps} style={{ ...typography.commonBtn, paddingVertical: 18, width: "100%", borderRadius: 100, marginTop: 10 }}>
                                        <SemiBold style={styles.convertBtnText}>Let's go</SemiBold>
                                    </Pressable>
                                </View>
                            </UseModal>
                        )}

                        {currentModalStep === "confirm" && (
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={true}
                                onRequestClose={onClose}
                            >
                                <TouchableWithoutFeedback onPress={onClose} >
                                    <View style={styles.modalOverlay}>
                                        <View style={styles.modalContent}>
                                            <View style={styles.modalContainer}>
                                                <SemiBold style={{ fontSize: 22, textAlign: "center", fontWeight: "600", color: "#0C1433" }}>Convert steps into coins</SemiBold>

                                                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                                    <View style={styles.modalStepsSection}>
                                                        <ShoeIcon height={75} width={68} />
                                                        <RegularText>Available</RegularText>
                                                        <SemiBold>{conversionSteps && conversionSteps.toLocaleString("en-US")}</SemiBold>
                                                        <RegularText>steps</RegularText>
                                                    </View>

                                                    <View style={styles.modalArrow}>
                                                        <RightArrowFull />
                                                    </View>

                                                    <View style={styles.modalCoinsSection}>
                                                        <BigCoinIcon height={75} width={63} />
                                                        <RegularText>Convert to</RegularText>
                                                        <SemiBold>{parseInt(conversionSteps / (maxSteps/10)).toLocaleString("en-US")}</SemiBold>
                                                        <RegularText>coins</RegularText>
                                                    </View>

                                                </View>
                                                <RegularText style={{ textAlign: "center", fontSize: 16 }}>Total steps since the last coins conversion
                                                    on {lastConversionStr ? lastConversionDate(lastConversionStr) : ""}</RegularText>

                                                <Pressable onPress={convertStepsToCoins} style={{ ...typography.commonBtn, paddingVertical: 18, width: "100%", borderRadius: 100, marginTop: 10 }}>
                                                    <SemiBold style={styles.convertBtnText}>Convert coins</SemiBold>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Modal>
                        )}
                        {currentModalStep === "success" && (
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={true}
                                onRequestClose={onClose}
                            >
                                <TouchableWithoutFeedback onPress={onClose} >
                                    <View style={styles.modalOverlay}>
                                        <View style={styles.modalContent}>
                                            <View style={styles.modalContainer}>
                                                <SemiBold style={{ fontSize: 22, textAlign: "center", fontWeight: "600", color: "#0C1433" }}>Congratulations!</SemiBold>

                                                <BigCoinIcon />
                                                <RegularText style={{ fontSize: 18 }}>You have earned</RegularText>
                                                <SemiBold style={{ fontSize: 20 }}>{convertedCoins && convertedCoins.toLocaleString("en-US")} coins</SemiBold>
                                                <RegularText style={{ textAlign: "center", fontSize: 16 }}>Use your coins to redeem discounts or products at rewards menu.</RegularText>

                                                <Pressable onPress={openPrizes} style={{ ...typography.commonBtn, paddingVertical: 18, width: "100%", borderRadius: 100, marginTop: 10 }}>
                                                    <SemiBold style={styles.convertBtnText}>Go to Reward</SemiBold>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Modal>
                        )}
                    

                    <View style={styles.homeTopSection}>
                        <View style={styles.homeGraphSection}>
                            <View style={styles.graphInnerSection}>
                                <View style={styles.stepsRightSection}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                        <SemiBold style={{ fontSize: 18, color: "#3F170B" }}>Today, you walked</SemiBold>
                                    </View>

                                    <View style={{ flexDirection: 'row', lineHeight: 34 }}>
                                        <SemiBold style={{...styles.stepsText, lineHeight: 34}}><SemiBold style={{fontSize: 32, lineHeight: 34}}>{userSteps.toLocaleString("en-US")}</SemiBold> steps</SemiBold>
                                    </View>

                                    <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                                        <RegularText>of your 10,000 steps goal</RegularText>
                                        <View style={{backgroundColor: "#FFA835", borderRadius: 100, paddingVertical: 5, paddingHorizontal: 5.50}}>
                                            <RightArrow width={5} height={6} color="#fff"/>
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <Pressable onPress={openActivities}>
                                        <CircularProgressBar
                                            size={120}
                                            width={16}
                                            fill={userSteps}
                                            icon={stepsImg}
                                        />
                                    </Pressable>
                                </View>
                            </View>
                        </View>

                        <View style={styles.stepsGraphSection}>
                            <View style={styles.stepsGraphInner}>
                                <View style={{borderTopWidth: 1, borderColor: "#E4EDF7"}}></View>
                                <View style={styles.header}>

                                    <RegularText style={styles.text}>
                                        {parseInt(conversionSteps) >= maxSteps
                                            ? "Available steps to convert"
                                            : `${remainingSteps && remainingSteps.toLocaleString("en-US")} more steps to earn your next coin`}
                                    </RegularText>
                                    <Pressable onPress={openInfoModal}>
                                        <InfoIcon />
                                    </Pressable>
                                </View>
                                <View style={styles.progressContainer}>
                                    {maxSteps > 0 && (
                                        <Progress.Bar
                                            progress={conversionSteps / maxSteps}
                                            width={width / 2}
                                            color="#FFC900"
                                            borderWidth={0}
                                            unfilledColor="#E1DEF6"
                                            style={styles.progressBar}
                                        />
                                    )}
                                    <View style={styles.progressTextContainer}>
                                        <RegularText style={styles.progressText}>
                                            {formatNumberToK(conversionSteps)}/{formatNumberToK(maxSteps)}
                                        </RegularText>
                                        <Coin2Icon height={75} width={63} />
                                    </View>
                                </View>
                                {parseInt(conversionSteps) >= maxSteps && (
                                    <View>
                                        <Pressable style={styles.commonBtn} onPress={onPress}>
                                            <SemiBold style={{...styles.convertBtnText, color: "#fff"}}>Ready to convert</SemiBold>
                                        </Pressable>
                                    </View>
                                )}
                            </View>
                        </View>

                    </View>

                    <View style={styles.exploreRewards}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16 }}>
                            <SemiBold style={{ fontSize: 21, color: appTypo.lightBlack}}>Explore Rewards</SemiBold>
                        </View>

                        <View style={styles.voucherGrid}>
                            <FlatList
                                data={vouchers}
                                renderItem={renderVoucherItem}
                                keyExtractor={item => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>

                        <Pressable onPress={openPrizes} style={{...styles.commonBtn, backgroundColor: "#fff", borderColor: appTypo.secondaryColor, borderWidth: 1, marginHorizontal: 16, }}>
                            <MediumText style={{ color: '#E53C6B', fontSize: 16, fontWeight: '600', textAlign: "center" }}>See All Rewards</MediumText>
                        </Pressable>
                    </View>

                    <View style={styles.articlesSection}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <SemiBold style={{ fontSize: 21, color: appTypo.lightBlack}}>Articles for you</SemiBold>
                        </View>

                        <View style={styles.articlesGrid}>
                            <FlatList
                                data={articles}
                                renderItem={renderArticleItem}
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>

                        <Pressable onPress={openArticles} style={styles.viewBtn}>
                            <SemiBold style={{ color: '#E53C6B', fontSize: 18, fontWeight: '600', textAlign: "center" }}>See All Articles</SemiBold>
                        </Pressable>
                    </View>

                </View>
            </ScrollView>
        </Layout>
    );
}