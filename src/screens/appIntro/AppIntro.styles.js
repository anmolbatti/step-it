import { StyleSheet, Dimensions } from "react-native";
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

export default styles = StyleSheet.create({
    image: {
        height: ScreenHeight + 50,
        width: ScreenWidth
    },
    slide: {
        position: "relative",
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
    },  
    imageOver: {
        width: ScreenWidth - 50,
        position: "absolute",
    },
    headingText: {
        fontSize: 42,
        color: "#fff",
        lineHeight: 42,
    },
    imageText: {
        color: "#fff",
        fontSize: 24,
        lineHeight: 24,
    },
    imageOverContent: {
        position: "absolute",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
        paddingTop: ScreenHeight - (ScreenHeight - 350)
    },
    dotStyle: {
        backgroundColor: "#A2B5D2",
        bottom: 80
    },
    activeDotStyle: {
        backgroundColor: "#fff",
        bottom: 80
    },
    joinNow: {
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 60,
        width: ScreenWidth - 50,
        alignItems: "center",
        borderRadius: 100,
        bottom: 26,
        right: 10
    },
});