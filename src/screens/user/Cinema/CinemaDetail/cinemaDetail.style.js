import reactDom from "react-dom";
import { StyleSheet } from "react-native";
import {
  WHITE,
  BLACK,
  GRAY,
  SECONDARY,
  GRAY200,
  GRAY400,
  windowWidth,
  GRAY300,
  PRIMARY,
  windowHeight,
  GRAY500,
} from "../../../../utils/styles/color";

const CinemaDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  cinemaImage: {
    flex: 1,
    width: windowWidth,
    height: windowHeight * 0.4,
    justifyContent: "flex-start",
  },
  listContainer: {
    // padding: 10
  },
  blackSpace: {
    height: windowHeight * 0.35,
  },
  fillSpace: {
    backgroundColor: WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headerComponent: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  cinemaInfoBox: {
    marginBottom: 10,
  },
  cinemaName: {
    color: PRIMARY,
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
  },
  cinemaInfo: {
    color: SECONDARY,
    fontSize: 16,
    marginBottom: 5,
  },

  bodyComponent: {
    padding: 10,
  },
  // Seating
  seatingContainer: {
    marginTop: 0,
  },
  seatPriceContainer: {
    maxWidth: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  seatMapViewContainer: {
    alignSelf: "center",
    marginTop: 5,
  },
  projectorImg: {
    width: "auto",
    resizeMode: "contain",
  },
  seatRow: {
    flexDirection: "row",
  },
  seatGridBox: {
    padding: 3,
  },
  seatBox: {
    width: 30,
    height: 30,
    borderColor: PRIMARY,
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: "center",
  },
  seatBoxText: {
    color: PRIMARY,
    fontSize: 10,
    fontWeight: "500",
    textAlign: "center",
  },
  seatAndPriceBox: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 15,
  },
  seatPriceBox: {
    width: 24,
    height: 24,
    borderColor: PRIMARY,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    marginRight: 5,
  },
  seatPriceBoxText: {
    color: PRIMARY,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  seatPriceText: {
    color: GRAY400,
    fontSize: 16,
    fontWeight: "400",
    marginTop: 2,
  },

  // Header
  header: {
    width: "100%",
    position: "absolute",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: WHITE,
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 15,
  },
  actionBtnBox: {
    width: "50%",
    padding: 10,
    alignSelf: "flex-end",
  },

  // Delete Dialog
  dialogText: {
    color: SECONDARY,
    fontSize: 18,
    fontWeight: "400",
  },
  dialogBtnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  dialogBtn: {
    width: "45%",
  },
});

export { CinemaDetailStyle };
