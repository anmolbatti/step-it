import { useEffect, useState, useCallback } from "react";
import { Text, View, TextInput, FlatList, ScrollView, RefreshControl } from "react-native";
import DetailInsightsLayout from "../DetailInsightsLayout";
import styles from "./DailyActivities.styles";
import SmallProgressBar from "../../components/SmallProgressBar";
import CircularProgressBar from "../../components/CircularProgressBar";
import stepsImg from '../../assets/images/Steps.png';
import VerticalLinesGraph from "../../components/VerticalLinesGraph";
import { useSelector } from "react-redux";
import { Pedometer } from 'expo-sensors';

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "../../components/AppTexts";
import { get } from "../../utils/axios";

export default DailyActivities = ({route}) => {
    const { stepsCount } = useSelector((state) => state.user);
    const [ weeklySteps, setWeeklySteps ] = useState([]);
    const [ hourlySteps, setHourlySteps ] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [dailySteps, setDailySteps] = useState(0);
    const { userSteps, pastStepCount, maxSteps } = route.params;

    const getSteps = async () => {
        try {
            const steps = await get("activity/");
            setWeeklySteps(steps?.weekly);
            setHourlySteps(steps?.hourly);
            setDailySteps(steps?.daily?.steps);
        } catch (error) {
            // console.log("error",error)
        }
    }

    // const subscribeStepCount = async () => {
    //     const isAvailable = await Pedometer.isAvailableAsync();
    //     setIsPedometerAvailable(String(isAvailable));
    
    //     if (isAvailable) {
    //         const end = new Date();
    //         const start = new Date();
    //         start.setDate(end.getDate() - 1);
            
    //         const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
    //         if (pastStepCountResult && pastStepCountResult.steps) {
    //             try {
    //                 try {
    //                     const updateSteps = await post("sync-step/", { steps: pastStepCountResult.steps });
    //                 } catch (error) {
    //                     console.log("error",error)
    //                 }
            
    //                 setDailySteps(pastStepCountResult.steps);
    //                 // dispatch(stepsCount(pastStepCountResult.steps));

    //             } catch (err) {
    //                 console.error("API Error:", err.response?.data || err.message);
    //             }
    //         }

    //     }
    // };

    useEffect(() => {
        getSteps();
    }, []);

    // useEffect(() => {
    //     if(hourlySteps){
    //         var totalDailySteps = 0;
    //         Promise.all(hourlySteps.map(item => {
    //             totalDailySteps += parseInt(item)
    //         }))

    //         console.log("totalDailySteps:", totalDailySteps);
    //     }
    // }, [hourlySteps]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        getSteps();
        // subscribeStepCount();
        
        setTimeout(() => {
          setRefreshing(false);
        }, 1200);
    }, []);
    
    return (
        <DetailInsightsLayout pageName={"Daily Activites"}>
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.container}>
                    <View style={styles.weeklyGraphs}>
                    {weeklySteps != "" && ( <>
                        <View style={styles.singleWeekDay}>
                            <RegularText style={styles.weekDayText}>Sun</RegularText>

                            <SmallProgressBar 
                                size={26}
                                width={2}
                                fill={weeklySteps?.sun?.steps}
                                maxSteps={maxSteps}
                            />
                        </View>

                        <View style={styles.singleWeekDay}>
                            <RegularText style={styles.weekDayText}>Mon</RegularText>
                            <SmallProgressBar 
                                size={26}
                                width={2}
                                fill={weeklySteps?.mon?.steps}
                                maxSteps={maxSteps}
                            />
                        </View>

                        <View style={styles.singleWeekDay}>
                            <RegularText style={styles.weekDayText}>Tue</RegularText>
                            <SmallProgressBar 
                                size={26}
                                width={2}
                                fill={weeklySteps?.tue?.steps}
                                maxSteps={maxSteps}
                            />
                        </View>

                        <View style={styles.singleWeekDay}>
                            <RegularText style={styles.weekDayText}>Wed</RegularText>
                            <SmallProgressBar 
                                size={26}
                                width={2}
                                fill={weeklySteps?.wed?.steps}
                                maxSteps={maxSteps}
                            />
                        </View>

                        <View style={styles.singleWeekDay}>
                            <RegularText style={styles.weekDayText}>Thu</RegularText>
                            <SmallProgressBar 
                                size={26}
                                width={2}
                                fill={weeklySteps?.thu?.steps}
                                maxSteps={maxSteps}
                            />
                        </View>

                        <View style={styles.singleWeekDay}>
                            <RegularText style={styles.weekDayText}>Fri</RegularText>
                            <SmallProgressBar 
                                size={26}
                                width={2}
                                fill={weeklySteps?.fri?.steps}
                                maxSteps={maxSteps}
                            />
                        </View>

                        <View style={styles.singleWeekDay}>
                            <RegularText style={styles.weekDayText}>Sat</RegularText>
                            <SmallProgressBar 
                                size={26}
                                width={2}
                                fill={weeklySteps?.sat?.steps}
                                maxSteps={maxSteps}
                            />
                        </View>
                    </> )}
                    </View>

                    <View style={styles.dailyStats}>
                        <SemiBold style={{fontSize: 20, color: "#2E2B53"}}>Daily Stats</SemiBold>
                        <View style={styles.dailyStatsGraph}>
                            <CircularProgressBar
                                size={100}
                                width={20}
                                fill={dailySteps}
                                icon={stepsImg}
                            />
                            <RegularText style={{fontSize: 18}}>Today’s steps</RegularText>
                            <View style={{flexDirection: "row", alignItems: "center"}}><SemiBold style={{fontSize: 21}}>
                                {dailySteps && dailySteps.toLocaleString("en-US")}
                            </SemiBold><RegularText style={{fontSize: 20}}> /{maxSteps && maxSteps.toLocaleString("en-US")} steps</RegularText></View>
                        </View>
                    </View>

                    <View style={styles.stepsGraph}>
                        <SemiBold style={styles.sectionLabel}>Steps</SemiBold>
                        
                        <MediumText style={{color: "#2E2B53"}}>TOTAL <SemiBold style={{fontSize: 18}}> {dailySteps && dailySteps.toLocaleString("en-US")} </SemiBold> steps </MediumText>
                        {hourlySteps != "" && (
                            <VerticalLinesGraph hourlySteps={hourlySteps}/>
                        )}
                    </View>
                </View>
            </ScrollView>
        </DetailInsightsLayout>
    );
}
