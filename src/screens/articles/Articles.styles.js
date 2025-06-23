import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        backgroundColor: '#E4EDF7',
    }, 
    articleHeader: {
        flexDirection: "column",
        gap: 12,
        paddingVertical: 10
    },
    filterTab: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 100,
        marginRight: 4
    },
    filterTabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        // paddingLeft: 16
    },
    fullVouchersList: {
        flexDirection: "column",
        gap: 18,
    },
});