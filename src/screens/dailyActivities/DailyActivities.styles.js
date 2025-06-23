import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      gap: 18
    },
    weeklyGraphs: {
      paddingVertical: 24,
      paddingHorizontal: 26,
      backgroundColor: "#fff",
      borderRadius: 18,
      flexDirection: "row",
      justifyContent: "space-between",
    }, 
    singleWeekDay: {
      flexDirection: "column",
      alignItems: "center",
      gap: 4
    },
    dailyStats: {
      flexDirection: "column",
      gap: 10
    },
    dailyStatsGraph: {
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: 20,
      paddingVertical: 20,
      paddingHorizontal: 40,
      gap: 10
    },
    stepsGraph: {
      backgroundColor: '#fff',
      borderRadius: 20,
      paddingVertical: 16,
      flexDirection: "column",
      gap: 10,
      paddingHorizontal: 20,
      paddingVertical: 20
    },  
    sectionLabel: {
      color: "#2E2B53",
      fontSize: 18,
    },
    weekDayText: {
      fontSize: 18, 
      fontWeight: "500",
      color: "#000000",
      lineHeight: 24
    },
    scrollContainer: {
      paddingBottom: 80,
      paddingTop: 20,
      paddingHorizontal: 12
  }
});