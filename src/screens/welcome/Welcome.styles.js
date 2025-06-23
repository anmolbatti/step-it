import { StyleSheet, Dimensions } from "react-native";
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    mainImg: {
        width: ScreenWidth/2.2,
        marginTop: ScreenHeight/3.6
    },
    joinNow: {
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 60,
        width: ScreenWidth - 50,
        alignItems: "center",
        borderRadius: 100
    },
    label: {
        position: 'absolute',
        left: 10,
        fontSize: 16,
        zIndex: 1,
        top: 6,
        fontSize: 12,
        backgroundColor: '#fff',
        color: '#757575',
        paddingHorizontal: 6,
    },
    loginBtn: {
        backgroundColor: "transparent",
        paddingVertical: 20,
        paddingHorizontal: 60,
        width: ScreenWidth - 50,
        alignItems: "center",
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#ffff"
    },
    loginBtns: {
        flexDirection: "column",
        gap: 20,
        position: "absolute",
        bottom: ScreenHeight - (ScreenHeight - 120)
    },
    skipNow: {
        paddingHorizontal: 60,
        width: ScreenWidth - 100,
        alignItems: "center",
        borderRadius: 100,
    },
    tabMainWrapper: {
        marginTop: 50,
        bottom: 0,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
        paddingTop: 24,
        paddingHorizontal: 20,
        paddingBottom: 48,
    },
    tabContent: {
        paddingVertical: 18,
        flexDirection: "column",
    }, 
    privacyPolicy: {
        flexDirection: "row",
        alignItems: "center"
    },
    bottomText: {
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#E4EDF7",
        paddingBottom: 6
    },
    location: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderColor: "#E4EDF7",
        // marginBottom: 20
    },
    inputStyle: {
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderColor: "#E2E2E2",
        borderRadius: 12,
        width: ScreenWidth - 40
    },
    continueBtn: {
        padding: 20,
        width: "100%",
        borderRadius: 100,
        marginTop: 14,
    },
    loginContinueBtn: {
        padding: 20,
        width: "100%",
        borderRadius: 100,
    },
    inputCode: {
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderColor: "#E2E2E2",
        borderRadius: 12,
        color: "#757575"
    },
    validationTexts: {
        flexDirection: "row",
        gap: 6,
        alignItems: "center"
    },
    validationError: {
        color: "red"
    },
    dobText: {
        borderWidth: 1,
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderColor: "#E2E2E2",
        borderRadius: 12,
        color: "#757575"
    },
    welcomeLoaderWrapper: {
        flex: 1,
        alignItems: "center"
    },
    welcomeLoaderImg: {
        width: ScreenWidth - 100,
        flex: 1
    },
    previewDetailsWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    previewImageData: {
        flexDirection: "column",
        alignItems: "center",
        gap: 16
    },
    previewBtn: {
        width: "100%", 
        position: "absolute", 
        bottom: ScreenHeight - (ScreenHeight - 100)
    },
    profileImg: { 
        width: 120, 
        height: 120, 
        borderRadius: 100 
    },
    allowAccessText: {
        textAlign: "center",
        alignItems: "center",
        marginTop: 16,
        flexDirection: "column",
        gap: 10
    },
    allowAccessBtns: {
        position: "absolute",
        bottom: 60,
        flexDirection: "column",
        gap: 20
    },
    tellUsAboutYourSelfContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        flexDirection: "column",
        gap: 20,
        zIndex: 9999
    },
    genderSelectionBtn: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        width: ScreenWidth - 60,
        borderRadius: 100,
        borderColor: "#2E2B53",
        borderWidth: 1,
        zIndex: 9999
    },
    continueSkipBtn: {
        flexDirection: "column",
        alignItems: "center",
        width: ScreenWidth - 40,
        gap: 16
    },
    loginFormFields: {
        flexDirection: "column",
        gap: 20
    },
    bottomLoginOptions: {
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        marginTop: 6
    },
    loginOptionIcons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 26
    },
    passField: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        borderWidth: 1,
        borderColor: "#E2E2E2",
        borderRadius: 12,
        justifyContent: "space-between",
        paddingRight: 6
    },
    passInputStyle: {
        paddingHorizontal: 18,
        paddingVertical: 12,
        width: ScreenWidth / 1.4
    },
    confirmPassFields: {
        flexDirection: "column",
        gap: 6
    }
});