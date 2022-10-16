import { StyleSheet } from "react-native";
import { PRIMARY, WHITE, GRAY } from "../../../../utils/styles/color";

const CinemaListstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal: 10,
    position: "relative",
  },
  headerComponent: {
    height: 20,
  },
  line: {
    height: 0.5,
    width: "100%",
    backgroundColor: GRAY,
  },
  iconS: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  Button: {
    margin: 10,
    marginBottom: 15,
    flexDirection: "row",
  },
  iconS: {
    position: "absolute",
    right: 10,
    top: 5,
  },
  buttonStyle: {
    width: 200,
    borderColor: "#ccc",
  },

  footerComponent: {
    alignItems: "center",
    marginVertical: 10,
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
});

export { CinemaListstyle };
