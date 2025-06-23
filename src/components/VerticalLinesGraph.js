import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    color: (opacity = 1) => `#000`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    barPercentage: 0.1,
    decimalPlaces: 0,
    propsForBackgroundLines: {
        stroke: "#e3e3e3",
        strokeDasharray: "",
        strokeWidth: 1,
    },
    propsForVerticalLabels: {
        fontSize: 12,
        translateY: 0,
    },
    propsForHorizontalLabels: {
        fontSize: 12,
        translateX: -10,
    },
    style: {
        borderRadius: 16
    }
};

const VerticalLinesGraph = ({ hourlySteps=null }) => {
    let currentHour = new Date().getHours();
    
    const formatHour = (hour) => {
        return hour < 10 ? `0${hour}:00` : `${hour}:00`;
    };
    
    const checkAmPm = (index) => {
        let displayHours = currentHour % 12;
        displayHours = displayHours ? displayHours : 12;

        return  `${displayHours-index <= 0 ? 12 + (displayHours-index) : displayHours-index } ${currentHour > 12 ? 'pm' : "am"}`
    }


    var data = {}
    if(hourlySteps){
        console.log("hourlySteps: ", hourlySteps)
        data = {
                labels: [checkAmPm(4), checkAmPm(3), checkAmPm(2), checkAmPm(1), checkAmPm(0)],
                datasets: [
                    {
                data: [hourlySteps[formatHour(currentHour-4)], hourlySteps[formatHour(currentHour-3)], hourlySteps[formatHour(currentHour-2)], hourlySteps[formatHour(currentHour-1)], hourlySteps[formatHour(currentHour)], hourlySteps[formatHour(currentHour)]],
                colors: [(opacity = 1) =>  "#E86051", (opacity = 1) =>  "#E86051", (opacity = 1) =>  "#E86051", (opacity = 1) =>  "#E86051", (opacity = 1) =>  "#E86051", (opacity = 1) =>  "#E86051"]
                }
            ]
        };
    }


    return (
        <View style={styles.container}>
            <BarChart
                style={styles.barChart}
                data={data}
                width={screenWidth - 60}
                height={260}
                yAxisLabel=""
                chartConfig={chartConfig}
                showBarTops={false}
                withCustomBarColorFromData
                fromZero
                withVerticalLines={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 260,
        flexDirection: 'row',
        position: "relative",
        // backgroundColor: '#fff',
        // borderRadius: 20,
        // paddingVertical: 16
    },
    barChart: {
        // borderRadius: 20,
    }
});

export default VerticalLinesGraph;
