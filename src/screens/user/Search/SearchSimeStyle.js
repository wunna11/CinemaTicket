import { StyleSheet } from "react-native";
import { PRIMARY, WHITE } from "../../../utils/styles/color";

const SearchSomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal: 10,
    position: "relative",
  },
  headerComponent: {
    height: 20,
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
  column: {
    flexDirection: "column",
  },
  label: {
    fontSize: 16,
    width: 300,
  },
  iimage1: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginLeft: 10,
  },
  iimageMovie: {
    width: 70,
    height: 100,
    borderRadius: 10,
    marginLeft: 20,
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
    width: 100,
  },

  //cinema Card Style
  containerCard: {
    width: "100%",
    aspectRatio: 2 / 1,
    marginVertical: 8,
  },
  imageStyle: {
    resizeMode: "cover",
    borderRadius: 15,
  },
  gradientBox: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 10,
    borderRadius: 15,
  },
  cinemaName: {
    color: WHITE,
    fontSize: 24,
    fontWeight: "500",
  },
  cinemaCity: {
    color: WHITE,
    fontSize: 18,
    fontWeight: "400",
  },
  searchSyl: {
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  Button: {
    width: "80%",
  },
});

export { SearchSomeStyle };
