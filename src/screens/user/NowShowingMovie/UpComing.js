import React, { useEffect, useState, useRef } from "react";
import { MovieListStyle } from "../MovieList/movieList.style";
import { useNavigation } from "@react-navigation/native";
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
import { firebase } from "../../../../config";
import moment from "moment";
import { doc } from "firebase/firestore";
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

const MovieListScreenUpcoming = () => {
  const navigation = useNavigation();

  //Search
  const SearchMovieUr = () => {
    navigation.navigate("SearchMovie");
  };

  //refresh
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //Selected Button
  const [type, setType] = useState([
    { name: "Now Showing", checked: true },
    { name: "Comming Soon", checked: false },
  ]);

  const clickType = (i) => {
    let types = [...type];
    types.map((item, index) => {
      index === i ? (item.checked = true) : (item.checked = false);
    });
    setType(types);
  };

  //current date output with time string" "
  const start = moment().format("YYYYMMDD");

  // Firebase collection
  const showDataRef = firebase.firestore().collection("shows");
  const movieDataRef = firebase.firestore().collection("movies");
  const cinemaRef = firebase.firestore().collection("cinemas");
  const [data, setData] = useState([]);

  const getDataShow = async () => {
    //Get all movies
    let allMovieID = [];
    const movieSnapShot = await movieDataRef.get();
    movieSnapShot.forEach((doc) => {
      allMovieID.push(doc.id);
    });

    //Current showing movies
    let showMovieDataID = [];
    const showMovieSnapshot = await showDataRef
      .where("date", "==", start)
      .get();
    showMovieSnapshot.forEach((doc) => {
      let id = doc.data().movieId;
      if (showMovieDataID.indexOf(id) == -1) showMovieDataID.push(id);
    });

    //up coming movies
    let UpComingMoviesID = allMovieID.filter(
      (item) => showMovieDataID.indexOf(item) == -1
    );
    UpComingMoviesID.map(async (item) => await getData(item));
  };

  useEffect(() => {
    getDataShow();
  }, []);

  const getData = async (movieId) => {
    await movieDataRef
      .doc(movieId)
      .get()
      .then(async (snapshot) => {
        const movie = snapshot.data();
        movie.id = snapshot.id;

        await showDataRef
          .where("movieId", "==", movie.id)
          .onSnapshot(async (querySnapshot) => {
            const showList = [];
            querySnapshot.forEach(async (doc) => {
              const show = doc.data();
              show.id = doc.id;
              showList.push(show);
            });
            // Date List
            const dates = showList.map((s) => s.date);
            const filterDates = dates.filter(
              (item, pos) => dates.indexOf(item) == pos
            );
            // Show Time
            const showTime = showList.map((s) => s.startTime);
            const filterShowTime = showTime.filter(
              (item, pos) => showTime.indexOf(item) == pos
            );
            // Cinema List
            const cId = showList.map((s) => s.cinemaId);
            const filterCId = cId.filter(
              (item, pos) => cId.indexOf(item) == pos
            );
            const cinemaData = [];
            filterCId.map(async (cId) => {
              await cinemaRef
                .doc(cId)
                .get()
                .then(async (snapshot) => {
                  let cinema = {};
                  cinema.id = snapshot.id;
                  cinema.name = snapshot.data().name;
                  cinema.city = snapshot.data().city;
                  cinema.seatCol = snapshot.data().seatCol;
                  cinema.seatRow = snapshot.data().seatRow;
                  cinema.seatPrice = snapshot.data().seatPrice;
                  cinemaData.push(cinema);
                });
            });

            movie.shows = showList;
            movie.showDate = filterDates;
            movie.showingAt = cinemaData;
            movie.showTime = filterShowTime[0];
            // data.push(movie);
          });

        setData((state) => [...state, movie]);
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  };

  const MovieDetailUSER = (movie) => {
    navigation.navigate("MovieDetailUser", { movie: movie });
  };

  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={MovieListStyle.containerUPCOME}>
      <SafeAreaView>
        <ScrollView key={Math.random()}>
          <View>
            <Animated.FlatList
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: { contentOffset: { x: scrollX } },
                  },
                ],
                { useNativeDriver: true }
              )}
              data={data}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 50,
                marginHorizontal: ESPACIO_LATERAL,
                paddingRight: 100,
              }}
              decelerationRate={0}
              snapToInterval={ANCHO_CONTENEDOR}
              scrollEventThrottle={16}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index, navigation }) => {
                const inputRange = [
                  (index - 1) * ANCHO_CONTENEDOR,
                  index * ANCHO_CONTENEDOR,
                  (index + 1) * ANCHO_CONTENEDOR,
                ];

                const outputRange = [0, -50, 0];
                const translateY = scrollX.interpolate({
                  inputRange,
                  outputRange,
                });

                return (
                  <View style={{ width: ANCHO_CONTENEDOR }}>
                    <TouchableOpacity
                      onPress={() => {
                        MovieDetailUSER(item);
                      }}
                    >
                      <Animated.View
                        style={{
                          marginHorizontal: ESPACIO,
                          padding: 8,
                          borderRadius: 34,
                          alignItems: "center",
                          transform: [{ translateY }],
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={{ uri: item.imagePoster }}
                          style={MovieListStyle.posterImage}
                        />

                        <Text> {item.runtime}</Text>
                        <Text style={MovieListStyle.headerTitle}>
                          {item.title}
                        </Text>

                        <Text> Category: {item.category}</Text>
                        <Text> Cast: {item.cast}</Text>
                        <Text> Director: {item.director}</Text>
                        <Text> Overview: {item.overview}</Text>
                      </Animated.View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MovieListScreenUpcoming;
