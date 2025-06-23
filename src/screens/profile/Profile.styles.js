import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 15
    },
    userDetails: {
        backgroundColor: "#ffff",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    userInfo: {
        flexDirection: "column",
        gap: 4,
    },
    rightArrow: {
        position: "absolute",
        right: 20
    },
    detailSingleTab: {
        backgroundColor: "#ffff",
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 8
    },
    detailTabs: {
        flexDirection: "column",
        gap: 1.2
    },
    tabsText:{
        fontSize: 18, 
        color: "#0C1433",
        fontWeight: "400"
    },
    profileImg: { 
        width: 50, 
        height: 50, 
        borderRadius: 100 
    },
    cancelSignOut: {
        backgroundColor: "#fff",
        borderColor: "#2E2B53",
        borderWidth: 1,
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flex: 1
    },
    confirmSignOut: {
        backgroundColor: "#2E2B53",
        borderColor: "#2E2B53",
        borderWidth: 1,
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flex: 1
    }
});