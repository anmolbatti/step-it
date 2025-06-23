import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 14,
    backgroundColor: '#E4EDF7',
    // paddingBottom: 40,
    // paddingTop: 20,
  },
  scrollContainer: {
    // paddingBottom: 40,
    // paddingTop: 20,
    // paddingHorizontal: 20
  },
  searchInput: {
    height: 50,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    fontFamily: "Regular",
    fontSize: 18
  },
  filterTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20

  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 100,
    marginRight: 4
  },
  sortByFilter: {
    flexDirection: "row",
    // paddingLeft: 16,
    justifyContent: "space-between",
    paddingVertical: 10
  },
  singleSortFilter: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 8,
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
    marginLeft: 1,
    // borderRightWidth: 1,
    paddingLeft: 38,
    borderColor: "#A2B5D2"
  },
  fullVouchersList: {
    flexDirection: "column",
    gap: 18
  }
});