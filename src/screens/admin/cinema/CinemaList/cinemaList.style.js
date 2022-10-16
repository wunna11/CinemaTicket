import { StyleSheet } from "react-native";
import { PRIMARY, WHITE } from "../../../../utils/styles/color";

const CinemaListstyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal: 10,
    position: "relative",
  },
  headerComponent: {
    height: 70,
  },
  footerComponent: {
    alignItems: "center",
    marginVertical: 10,
  },
  header: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: PRIMARY,
    fontSize: 24,
    fontWeight: "500",
  },
  headerBtn: {
    // width: 100,
  },
});

export { CinemaListstyle };
