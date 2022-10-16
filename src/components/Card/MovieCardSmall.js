import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
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

export const MovieCardSmall = ({ movie,linking=true }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={ linking ? () =>
        navigation.navigate("MovieDetail", {
          showBtn: true,
          movie: movie,
        }) : null
      }
    >
      <View style={MovieCardSmallStyle.container}>
        <View style={MovieCardSmallStyle.topComponent}>
          <Image
            style={MovieCardSmallStyle.moviePosterImage}
            source={{ uri: movie.imagePoster }}
          />
          <View style={MovieCardSmallStyle.movieTitleBox}>
            <View>
              <Text style={MovieCardSmallStyle.movieTitle}>{movie.title}</Text>
            </View>
            <View>
              <Text style={MovieCardSmallStyle.movieTitleInfoText}>
                {movie.year}
              </Text>
              <Text style={MovieCardSmallStyle.movieTitleInfoText}>
                {movie.runtime}
              </Text>
              <View style={MovieCardSmallStyle.imdbRateStyle}>
                <Image
                  style={MovieCardSmallStyle.imdbImage}
                  source={require("../../../assets/img/imdb_logo.png")}
                />
                <Text style={MovieCardSmallStyle.movieTitleInfoText}>
                  {movie.imdbRating}/10
                </Text>
                <View style={MovieCardSmallStyle.ratedBox}>
                  <Text style={MovieCardSmallStyle.ratedText}>
                    {movie.rated}
                  </Text>
                </View>
              </View>
              <Text style={MovieCardSmallStyle.movieTitleInfoText}>
                {movie.category}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const MovieCardSmallUser = ({ movie }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MovieDetailOnly", {
          showBtn: true,
          movie: movie,
        })
      }
    >
      <View style={MovieCardSmallStyle.container}>
        <View style={MovieCardSmallStyle.topComponent}>
          <Image
            style={MovieCardSmallStyle.moviePosterImage}
            source={{ uri: movie.imagePoster }}
          />
          <View style={MovieCardSmallStyle.movieTitleBox}>
            <View>
              <Text style={MovieCardSmallStyle.movieTitle}>{movie.title}</Text>
            </View>
            <View>
              <Text style={MovieCardSmallStyle.movieTitleInfoText}>
                {movie.year}
              </Text>
              <Text style={MovieCardSmallStyle.movieTitleInfoText}>
                {movie.runtime}
              </Text>
              <View style={MovieCardSmallStyle.imdbRateStyle}>
                <Image
                  style={MovieCardSmallStyle.imdbImage}
                  source={require("../../../assets/img/imdb_logo.png")}
                />
                <Text style={MovieCardSmallStyle.movieTitleInfoText}>
                  {movie.imdbRating}/10
                </Text>
                <View style={MovieCardSmallStyle.ratedBox}>
                  <Text style={MovieCardSmallStyle.ratedText}>
                    {movie.rated}
                  </Text>
                </View>
              </View>
              <Text style={MovieCardSmallStyle.movieTitleInfoText}>
                {movie.category}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MovieCardSmallStyle = StyleSheet.create({
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
});
