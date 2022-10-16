import { StyleSheet, Dimensions } from "react-native";
import {
  BLACK,
  GRAY,
  GRAY100,
  GRAY200,
  GRAY400,
  PRIMARY,
  SECONDARY,
  WHITE,
  windowWidth,
} from "../../utils/styles/color";

const MovieCardStyle = StyleSheet.create({
  container: {
    backgroundColor: GRAY100,
    padding: 10,
    marginVertical: 8,
    borderRadius: 15,
  },
  topComponent: {
    flexDirection: "row",
  },
  moviePosterImage: {
    width: windowWidth * 0.3,
    aspectRatio: 2 / 3,
    resizeMode: "cover",
    borderRadius: 10,
    backgroundColor: SECONDARY,
  },
  movieTitleBox: {
    width: windowWidth * 0.55,
    paddingLeft: 10,
    justifyContent: "space-between",
  },
  movieTitle: {
    color: PRIMARY,
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  movieTitleInfoText: {
    color: SECONDARY,
    fontSize: 16,
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
  ratedText: {
    color: SECONDARY,
    width: 60,
    fontSize: 14,
    fontWeight: "400",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: SECONDARY,
    textAlign: "center",
    marginLeft: 10,
  },

  bodyComponent: {
    marginTop: 10,
  },
  subHeader: {
    color: PRIMARY,
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
  },
  dateText: {
    color: SECONDARY,
    fontSize: 14,
    fontWeight: "400",
    padding: 1,
  },
  cinemaRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
    flexWrap: "wrap",
  },
  cinemaBox: {
    padding: 5,
  },
  cinemaText: {
    color: WHITE,
    fontSize: 12,
    padding: 10,
    backgroundColor: SECONDARY,
    borderRadius: 10,
    fontWeight: "400",
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export { MovieCardStyle };
