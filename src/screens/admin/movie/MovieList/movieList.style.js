import { StyleSheet } from "react-native";
import { BLACK, PRIMARY, WHITE } from "../../../../utils/styles/color";

const MovieListStyle = StyleSheet.create({
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
    height: 60,
  },
  footerComponent: {
    alignItems: "center",
    marginVertical: 10,
  },

  // Header
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

export { MovieListStyle };
