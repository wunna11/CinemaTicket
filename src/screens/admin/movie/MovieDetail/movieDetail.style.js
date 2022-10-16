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
  GRAY100,
} from "../../../../utils/styles/color";

const MovieDetailStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  movieCoverImage: {
    flex: 1,
    width: windowWidth,
    height: windowHeight * 0.5,
    justifyContent: "flex-start",
    position: "relative",
  },
  blackSpace: {
    height: windowHeight * 0.45,
  },
  fillSpace: {
    backgroundColor: WHITE,
    padding: 24,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: -80,
  },
  moviePosterImage: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.45,
    borderRadius: 20,
  },
  movieTitleBox: {
    width: windowWidth * 0.55,
    paddingLeft: 10,
    justifyContent: "space-between",
    // marginTop: 50,
  },
  movieTitle: {
    color: PRIMARY,
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
  },
  ratedBox: {
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderRadius: 2,
    height: 20,
    borderWidth: 1,
    borderColor: SECONDARY,
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  ratedText: {
    color: SECONDARY,
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "00",
    textAlign: "center",
  },
  bodyContainer: {
    marginBottom: 20,
  },
  movieInfoBox: {
    marginTop: 10,
  },
  movieTitleInfoText: {
    color: SECONDARY,
    fontSize: 16,
    fontWeight: "400",
    padding: 1,
  },
  movieInfoText: {
    color: SECONDARY,
    fontSize: 14,
    fontWeight: "400",
    padding: 1,
  },
  imdbRateStyle: {
    flexDirection: "row",
    textAlignVertical: "center",
  },
  imdbImage: {
    width: 35,
    height: "auto",
    resizeMode: "contain",
    marginRight: 5,
  },
  subHeader: {
    color: PRIMARY,
    fontSize: 20,
    fontWeight: "500",
    marginTop: 20,
  },

  // Cinema - List
  cinemaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cinemaBox: {
    width: "48%",
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

  // Date - List
  dateContainer: {
    flexDirection: "row",
    marginTop: 10,
    flexWrap: "wrap",
  },
  dateBox: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: GRAY200,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dateText1: {
    color: PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  dateText2: {
    color: SECONDARY,
    fontSize: 24,
    fontWeight: "500",
  },

  btnBox: {
    marginTop: 0,
  },
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

  // Header
  header: {
    width: "100%",
    position: "absolute",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
  },
  headerBackBtn: {
    // width: 70,
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: WHITE,
    fontSize: 24,
    fontWeight: "500",
    marginLeft: 15,
  },
  headerRightBtn: {
    // width: 150,
  },
});

export { MovieDetailStyle };
