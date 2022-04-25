import { ScaledSheet } from "react-native-size-matters";
export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginTop: "10@s",
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  serachBarContainer: {
    flexDirection: "row",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#bbb",
  },
  searchInput: {
    flex: 1,
    textAlign: "right",
    padding: 10,
    fontSize: "12@s",
    height: "40@s",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  searchIconOuter: {
    padding: 10,
  },
  searchIcon: {
    flex: 1,
    height: "40@s",
  },
  headerText: {
    fontSize: "20@s",
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: "auto",
    margin: 5,
  },
  subHeaderText: {
    fontSize: "12@s",
    padding: 5,
    marginBottom: "20@s",
    textAlign: "center",
    color: "#888",
    marginHorizontal: "auto",
  },
});
