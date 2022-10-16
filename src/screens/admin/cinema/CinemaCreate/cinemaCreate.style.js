import { StyleSheet } from "react-native";
import {
  BLACK,
  PRIMARY,
  SECONDARY,
  WHITE,
  windowWidth,
} from "../../../../utils/styles/color";

const CinemaCreateStyle = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    marginTop: 30,
    padding: 10,
  },
  imageStyle: {
    width: "100%",
    aspectRatio: 3 / 2,
    backgroundColor: SECONDARY,
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: WHITE,
  },
  imageIcon: {
    color: WHITE,
    fontSize: 20,
    textAlign: "center",
  },
  coverImgStyle: {
    width: 200,
    height: 200,
    backgroundColor: SECONDARY,
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: WHITE,
  },
  coverImgIcon: {
    color: WHITE,
    fontSize: 20,
    textAlign: "center",
  },
  bodyContainer: {
    marginTop: 10,
  },
  btnBox: {
    width: "100%",
    marginTop: 20,
  },
  titleText: {
    color: BLACK,
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 5,
  },

  // Seating
  seatingContainer: {
    alignSelf: "center",
    marginTop: 20,
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
  seatingPriceContainer: {
    marginTop: 5,
    paddingHorizontal: 20,
  },
  seatPriceRow: {
    width: windowWidth-100,
    flexDirection: "row",
    alignItems: "center",
  },
  seatBoxForPrice: {
    width: 36,
    height: 36,
    backgroundColor: PRIMARY,
    borderRadius: 5,
    justifyContent: "center",
  },
  seatBoxTextForPrice: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  seatPriceInput: {
    marginLeft: 10,
    height: 50,
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
    alignItems: "center",
  },
  headerBackBtn: {
    // width: 70,
  },
  headerTitle: {
    color: PRIMARY,
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 10,
  },

  // Loading Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalLoadingCircle: {
    marginBottom: 20,
  },
  modalText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: "500",
  },
});

export { CinemaCreateStyle };
