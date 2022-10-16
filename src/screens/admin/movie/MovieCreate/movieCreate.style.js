import { StyleSheet } from "react-native";
import {
  PRIMARY,
  SECONDARY,
  WHITE,
  BLACK,
  GRAY400,
  GRAY200,
  GRAY100,
} from "../../../../utils/styles/color";

const MovieCreateStyle = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    padding: 10,
    marginTop: 30,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: BLACK,
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 5,
    marginTop: 20,
    marginBottom: 5,
  },
  titleLabel: {
    color: GRAY400,
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 5,
    marginTop: 20,
    marginBottom: 5,
  },
  imgLabel: {
    color: SECONDARY,
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 10,
    marginBottom: 5,
  },
  posterImgStyle: {
    height: 200,
    aspectRatio: 2 / 3,
    backgroundColor: SECONDARY,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: WHITE,
  },
  coverImgStyle: {
    width: 200,
    height: 200,
    backgroundColor: SECONDARY,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: WHITE,
  },
  imgUploadText: {
    color: GRAY100,
    fontSize: 14,
    fontWeight: '500',
    textAlign: "center",
    marginTop: 10,
  },
  bodyContainer: {
    //
  },
  btnBox: {
    width: "100%",
    marginTop: 20,
  },

  // Cinema - List
  cinemaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cinemaBox: {
    width: "45%",
    backgroundColor: SECONDARY,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  cinemaBoxSelected: {
    backgroundColor: PRIMARY,
  },
  cinemaBoxText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
  cinemaBoxText2: {
    color: WHITE,
    fontSize: 12,
    fontWeight: "300",
    textAlign: "center",
  },

  // Date - Listing
  dateContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dateBox: {
    width: "18%",
    height: 100,
    backgroundColor: PRIMARY,
    padding: 10,
    justifyContent: "center",
    marginVertical: 5,
    marginRight: 5,
    borderRadius: 10,
  },
  dateBoxText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 24,
  },
  datePickBtn: {
    backgroundColor: SECONDARY,
    alignItems: "center",
  },
  datePickBtnText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 3,
  },

  // Time List
  timeBox: {
    width: "35%",
    padding: 10,
    justifyContent: "center",
    marginVertical: 5,
    marginRight: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: PRIMARY,
  },
  timeBoxText: {
    color: PRIMARY,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  timeBoxBtn: {
    width: "40%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    borderColor: SECONDARY,
    flexDirection: "row",
  },
  timeBoxBtnText: {
    color: SECONDARY,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },

  // Modal
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
});

export { MovieCreateStyle };
