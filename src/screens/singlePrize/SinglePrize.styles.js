import { StyleSheet, Dimensions } from "react-native";
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

export default styles = StyleSheet.create({
    prizeImgContainer: {
        position: "relative",
        width: ScreenWidth,
        height: 300, // Fixed height for the image container
    },
    voucherImg: {
        width: ScreenWidth,
        height: "100%",
        // height: ScreenHeight / 2.38,
        alignItems: 'center'
    },
    backBtn: {
        position: "absolute",
        backgroundColor: "#ffff",
        top: 50,
        left: 30,
        padding: 10,
        borderRadius: 8,
        zIndex: 9
    },
    content: {
        flexDirection: "column",
        gap: 10,
        backgroundColor: "#E4EDF7",
        flex: 1,
        marginBottom: 100,
    },
    prizeTitle: {
        fontSize: 21,
        color: "#0C1433"
    },
    prizeContent: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "column",
        gap: 14,
    },
    validUntil: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center"
    },
    timeLeft: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4
    },
    detailedTime: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0C1433CC",
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 6
    },
    aboutOffer: {
        backgroundColor: "#ffff",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 16
    },
    convertBtnText: {
        fontSize: 18,
        lineHeight: 20,
        fontWeight: '700',
        letterSpacing: 0.35,
        color: 'white',
    },
    redeemPrizeBtn: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 30,
        backgroundColor: "#fff",
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    scrollContent: {
        flexGrow: 1,
        // paddingBottom: 320, // Ensures content is not cut off
    },
});
