import { StyleSheet } from "react-native";
import {
  PRIMARY,
  SECONDARY,
  WHITE,
  GRAY400,
  GRAY100,
  GRAY200,
  GRAY300,
  BLACK,
} from "../../../utils/styles/color";

const ShowDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },

  headerComponent: {
    marginTop: 50,
  },

  footerComponent: {
    padding: 10,
  },

  title: {
    fontSize: 13,
    marginBottom: 10,
    //marginLeft: 10,
    textAlign: "center",
    fontWeight: "bold",
  },

  gap: {
    marginBottom: 15,
  },

  // Cinema
  cinemaLayout: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cinemaBox: {
    backgroundColor: SECONDARY,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  cinemaBoxSelected: {
    backgroundColor: PRIMARY,
  },
  cinemaText: {
    fontSize: 16,
    fontWeight: "500",
    color: WHITE,
    textAlign: "center",
  },

  // Show Date
  dateLayout: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dateBox: {
    backgroundColor: SECONDARY,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  dateFont: {
    fontSize: 26,
    fontWeight: "500",
    color: WHITE,
    textAlign: "center",
  },
  dayOfWeek: {
    fontSize: 18,
    fontWeight: "400",
    color: GRAY100,
    textAlign: "center",
  },

  // Show Time
  timeLayout: {
    flexDirection: "row",
    justifyContent: "center",
  },
  timeBox: {
    backgroundColor: PRIMARY,
    borderRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  timeText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: "500",
    marginVertical: 4,
  },

  // Seating
  seatingContainer: {
    marginTop: 10,
  },
  seatPriceContainer: {
    maxWidth: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  seatMapViewContainer: {
    alignSelf: "center",
    // marginTop: 5,
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
  seatReserveBox: {
    backgroundColor: GRAY200,
    borderWidth: 0,
  },
  seatBoxText: {
    color: PRIMARY,
    fontSize: 10,
    fontWeight: "500",
    textAlign: "center",
  },
  seatReserveBoxText: {
    color: WHITE,
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

  incomeTextKey: {
    fontSize: 18,
    fontWeight: "400",
    color: GRAY400,
    marginTop: 5,
  },
  incomeTextValue: {
    fontSize: 18,
    fontWeight: "400",
    color: PRIMARY,
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
    color: PRIMARY,
    fontSize: 20,
    fontWeight: "500",
    marginLeft: "25%",
  },
  actionBtnBox: {
    width: "50%",
    padding: 10,
    alignSelf: "flex-end",
  },

  // Alert
  chooseAlert: {
    color: WHITE,
    backgroundColor: GRAY200,
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
    padding: 10,
  },

  // Dialog
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

export { ShowDetailStyle };
