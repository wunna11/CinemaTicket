import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
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

export const MovieCard = ({ movie }) => {
  const navigation = useNavigation();

  const RenderShowDate = () => {
    const dateList = movie.showDate.map((date, i) => {
      // console.log(i);
      return (
        <View style={MovieCardStyle.dateBox} key={i} >
          <Text style={MovieCardStyle.dateText2}>
            {moment(date).format("D")}
          </Text>
          <Text style={MovieCardStyle.dateText1} >
            {moment(date).format("ddd").toUpperCase()}
          </Text>
        </View>
      );
    });
    return (
      <>
        <Text style={MovieCardStyle.subHeader}>Show Date</Text>
        <View style={MovieCardStyle.dateContainer}>{dateList}</View>
      </>
    );
  };

  const RenderShowingAt = () => {
    const cinemaList = movie.showingAt.map((c,i) => {
      return (
        <View style={MovieCardStyle.cinemaBox} key={i} >
          <Text style={MovieCardStyle.cinemaText}>{c.name}</Text>
        </View>
      );
    });
    return (
      <>
        <Text style={MovieCardStyle.subHeader}>Showing At</Text>
        <View style={MovieCardStyle.cinemaContainer}>{cinemaList}</View>
      </>
    );
  };
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ShowDetail", {
          showBtn: true,
          movie: movie,
        })
      }
    >
      <View style={MovieCardStyle.container}>
        <View style={MovieCardStyle.topComponent}>
          <Image
            style={MovieCardStyle.moviePosterImage}
            source={{ uri: movie.imagePoster }}
          />
          <View style={MovieCardStyle.movieTitleBox}>
            <View>
              <Text style={MovieCardStyle.movieTitle}>{movie.title}</Text>
            </View>
            <View>
              <Text style={MovieCardStyle.movieTitleInfoText}>
                {movie.year}
              </Text>
              <Text style={MovieCardStyle.movieTitleInfoText}>
                {movie.runtime}
              </Text>
              <View style={MovieCardStyle.imdbRateStyle}>
                <Image
                  style={MovieCardStyle.imdbImage}
                  source={require("../../../assets/img/imdb_logo.png")}
                />
                <Text style={MovieCardStyle.movieTitleInfoText}>
                  {movie.imdbRating}/10
                </Text>
                <View style={MovieCardStyle.ratedBox}>
                  <Text style={MovieCardStyle.ratedText}>{movie.rated}</Text>
                </View>
              </View>
              <Text style={MovieCardStyle.movieTitleInfoText}>
                {movie.category}
              </Text>
            </View>
          </View>
        </View>
        <View style={MovieCardStyle.bodyComponent}>
          <RenderShowDate />
          <RenderShowingAt />
        </View>
      </View>
    </TouchableOpacity>
  );
};

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

  bodyComponent: {
    marginTop: 5,
  },
  subHeader: {
    color: PRIMARY,
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
  },
  dateContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  dateBox: {
    minWidth: 48,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: SECONDARY,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dateText1: {
    color: GRAY200,
    fontSize: 12,
    fontWeight: "500",
  },
  dateText2: {
    color: WHITE,
    fontSize: 18,
    fontWeight: "500",
  },
  cinemaContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  cinemaBox: {
    padding: 10,
    backgroundColor: SECONDARY,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
  },
  cinemaText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
