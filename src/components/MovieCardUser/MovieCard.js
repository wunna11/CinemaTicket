import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MovieCardStyle } from "./MovieCardStyle";

export const MovieCard = ({ movie }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MovieDetail", { movie: movie })}
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
                <Text style={MovieCardStyle.ratedText}>{movie.rated}</Text>
              </View>
              <Text style={MovieCardStyle.movieTitleInfoText}>
                {movie.category}
              </Text>
            </View>
          </View>
        </View>
        <View style={MovieCardStyle.bodyComponent}>
          <Text style={MovieCardStyle.subHeader}>Show Date</Text>
          <Text style={MovieCardStyle.dateText}>12 Aug - 26 Aug</Text>
          <Text style={MovieCardStyle.subHeader}>Showing At</Text>
          <View style={MovieCardStyle.cinemaRow}>
            <View style={MovieCardStyle.cinemaBox}>
              <Text style={MovieCardStyle.cinemaText}>Junction Mawtin</Text>
            </View>
            <View style={MovieCardStyle.cinemaBox}>
              <Text style={MovieCardStyle.cinemaText}>Diamond Palaza</Text>
            </View>
            <View style={MovieCardStyle.cinemaBox}>
              <Text style={MovieCardStyle.cinemaText}>
                Aung Thiri ( Lashio )
              </Text>
            </View>
            <View style={MovieCardStyle.cinemaBox}>
              <Text style={MovieCardStyle.cinemaText}>Junction Mawtin</Text>
            </View>
            <View style={MovieCardStyle.cinemaBox}>
              <Text style={MovieCardStyle.cinemaText}>
                Time City (Taung Ngu)
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
