import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GRAY100, WHITE } from "../../utils/styles/color";
import { LinearGradient } from "expo-linear-gradient";

export const CinemaCard = ({ cinema }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("CinemaDetail", {
          showBtnEdit: true,
          cinema: cinema,
        })
      }
    >
      <ImageBackground
        style={CinemaCardStyle.container}
        imageStyle={CinemaCardStyle.imageStyle}
        source={{ uri: cinema.image }}
      >
        <LinearGradient
          style={CinemaCardStyle.gradientBox}
          colors={["rgba(0,0,0,0.5)", "transparent", "rgba(237, 63, 33,0.5)"]}
        >
          <Text style={CinemaCardStyle.cinemaCity}>{cinema.city}</Text>
          <Text style={CinemaCardStyle.cinemaName}>{cinema.name}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const CinemaCardStyle = StyleSheet.create({
  container: {
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
    fontSize: 16,
    fontWeight: "300",
  },
});
