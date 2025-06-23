import { StyleSheet, Dimensions } from "react-native";
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E4EDF7",
    },
    prizeImgContainer: {
        paddingHorizontal: 20,
    },
    backBtn: {
        // position: "absolute",
        backgroundColor: "#E4EDF7",
        width: 45,
        // top: 50,
        // left: 30,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        // zIndex: 9
    },
    content: {
        marginTop: 40,
        flexDirection: "column",
        gap: 10,
        backgroundColor: "#fff",
        flex: 1,
        height: "100%",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 10
    },
    prizeTitle: {
        fontSize: 21,
        color: "#0C1433"
    },
    prizeContent: {
        paddingVertical: 10,
        flexDirection: "column",
        gap: 14,
        paddingHorizontal: 20,
    },
    validUntil: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    timeLeft: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    detailedTime: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0C1433CC",
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
        gap: 4
    },
    aboutOffer: {
        backgroundColor: "#ffff",
        borderRadius: 10,
        paddingTop: 10,
        paddingHorizontal: 16,
        // paddingBottom: 40,
    },
    convertBtnText: {
        fontSize: 18,
        lineHeight: 20,
        fontWeight: '700',
        letterSpacing: 0.35,
        color: 'white',
    },
    articleImg:{
        width: ScreenWidth,
        height: 210
    },
    writtenByMain: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderRadius: 10,
    },
    writtenByShadow: {
        marginHorizontal: 16,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: 'white', // Ensure the background color is set to see the shadow clearly
        shadowColor: 'gray', // Shadow color
        shadowOffset: { width: 0, height: 1 }, // Offset of the shadow
        shadowOpacity: 0.2, // Opacity of the shadow
        shadowRadius: 3, // Blur radius of the shadow
        elevation: 5, // Android elevation
    },
    realtedActiles: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        borderRadius: 10,
    },
    singleRelatedArticle: {
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: 'white', // Ensure the background color is set to see the shadow clearly
        // shadowColor: 'gray', // Shadow color
        // shadowOffset: { width: 0, height: 0 }, // Offset of the shadow
        // shadowOpacity: 0, // Opacity of the shadow
        // shadowRadius: 3, // Blur radius of the shadow
        // elevation: 5, // Android elevation
    }

});