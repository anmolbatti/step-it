import { StyleSheet, Dimensions } from "react-native";
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

export default styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 20,
        marginBottom: 165,
    },
    scrollContainer: {
        // marginBottom: 100,
        // paddingBottom: 100
    },  
    redeemContent: {
        backgroundColor: '#0C1433',
        marginTop: 10
    },
    aboutOffer: {
        backgroundColor: "#ffff",
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 15,
        marginVertical: 22
    },
    redeemInstruction: {
        backgroundColor: "#ffff",
        textAlign: "center",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: "column",
        gap: 20,
        marginTop: 22
    },
    convertBtnText: {
        fontSize: 18,
        lineHeight: 20,
        letterSpacing: 0.35,
        color: 'white'
    },
    rectangularBox: {
        height: 70,
        backgroundColor: 'lavender',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    rectangularBoxPlain: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1, // Adjust the width of the border as needed
        borderColor: "#000",
        paddingHorizontal: 24,
        paddingVertical: 10,
        flexDirection: "column",
        gap: 10
    },
    rectangularBoxRedeemVoucher: {
        backgroundColor: '#E4EDF7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        flexDirection: "column",
        gap: 4
    },
    randomText: {
        fontSize: 18,
        lineHeight: 20,
        textAlign: 'center'
    },
    randomTextCenter: {
        fontSize: 17,
        lineHeight: 20,
        textAlign: 'center'
    },
    tick: {
        width: 20, 
        height: 20
    },
    contactUs:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    link:{
        textDecorationLine: 'underline',
        fontSize: 18,
    }

});