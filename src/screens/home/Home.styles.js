import { StyleSheet, Dimensions } from "react-native";
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;
import { appTypo } from "../../utils/typography";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    homeContent: {
        backgroundColor: '#E4EDF7',
        flexDirection: "column",
        justifyContent: 'space-between',
    },
    topUserName: {
        marginTop: 6
    },
    articlesGrid: {
        // paddingLeft: 8
    },
    voucherGrid: {
        // paddingLeft: 8
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
    homeGraphSection: {
        backgroundColor: appTypo.themeColor,
        borderRadius: 40,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingHorizontal: 16,
        // paddingTop: 0
    },
    graphInnerSection: {
        flex: 1,
        backgroundColor: appTypo.background,
        borderRadius: 20,
        paddingTop: 22,
        paddingBottom: 22,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        gap: 20,
    },
    stepsGraphSection: {
        paddingHorizontal: 16
    },
    stepsGraphInner: {
        backgroundColor: appTypo.background,
        // paddingTop: 22,
        paddingHorizontal: 24,
        paddingBottom: 15,
        gap: 7,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    stepgraphbg: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },    
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
        
    },
    progressTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10
    },
    progressBar: {
        marginRight: 10,
        width:width / 2
    },
    progressText: {
        color: appTypo.darkText,
    },
    text: {
        color: appTypo.darkText,
        marginRight:10
    },

    stepsRightSection: {
        flexDirection: "column",
        gap: 10
    },
    commonBtn: {
        justifyContent: "flex-start",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        backgroundColor: '#E52884',
        borderRadius: 20,
    },

    convertBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2E2B53',
        borderRadius: 20
    },
    convertBtnText: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '700',
        letterSpacing: 0.35,
        color: '#fff',
        textAlign: "center"
    },
    modalContainer: {
        flexDirection: "column",
        gap: 14,
        alignItems: "center",
    },
    modalStepsSection: {
        backgroundColor: "#E4EDF7",
        flex: 1,
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 20
    },
    modalCoinsSection: {
        backgroundColor: "#E1DEF6",
        flex: 1,
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 20
    },
    modalArrow: {
        flex: 0,
        alignItems: "center"
    },
    stepsText: {
        color: appTypo.secondaryColor,
        fontSize: 18
    },
    exploreRewards: {
        flexDirection: "column", 
        marginTop: 20,
        paddingVertical: 20,
        backgroundColor: appTypo.background,
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        gap: 8
    },
    articlesSection: {
        flexDirection: "column",
        backgroundColor: appTypo.lightGrey,
        paddingTop: 32,
        paddingHorizontal: 16
    },
    viewBtn: {
        borderColor: appTypo.secondaryColor,
        borderRadius: 40,
        paddingVertical: 10,
        borderWidth: 1,
        marginVertical: 24
    }
});