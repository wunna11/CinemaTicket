import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  RefreshControl,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { firebase } from "../../../../config";

//refresh wait
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const ANCHO_CONTENEDOR = width * 0.8;
const ESPACIO_LATERAL = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 9;
const ALTURA_BACKDROP = height * 0.8;

const BackDrop = ({ scrollX }) => {
  //data read
  const [data, setData] = useState([]);
  const dataRef = firebase.firestore().collection("movies");

  const MovieListScreenUpcoming = () => {
    return <MovieListScreenUpcoming />;
  };

  //data read from MOVIE DATABASE

  const getData = () => {
    dataRef.onSnapshot((querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        const movie = doc.data();
        movie.id = doc.id;
        data.push(movie);
      });
      setData(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View
      style={
        ([
          {
            height: ALTURA_BACKDROP,
            width,
            position: "absolute",
            top: 0,
          },
        ],
        StyleSheet.absoluteFillObject)
      }
    >
      {data.map((item, index) => {
        const inputRange = [
          (index - 1) * ANCHO_CONTENEDOR,
          index * ANCHO_CONTENEDOR,
          (index + 1) * ANCHO_CONTENEDOR,
        ];
        const outputRange = [0, 1, 0];
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange,
        });

        return (
          <Animated.Image
            source={{ uri: item.imagePoster }}
            key={index}
            blurRadius={13}
            style={[
              {
                height: ALTURA_BACKDROP,
                width,
                position: "absolute",
                top: 0,
                opacity,
              },
            ]}
          />
        );
      })}
      <LinearGradient
        colors={["transparent", "white"]}
        style={{ height: ALTURA_BACKDROP, width, position: "absolute", top: 0 }}
      />
    </View>
  );
};

export default BackDrop;
