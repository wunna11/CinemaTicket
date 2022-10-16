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
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { firebase } from "../../../../config";
import moment from "moment";
import { GRAY, PRIMARY, WHITE } from "../../../utils/styles/color";
import MovieListScreenUpcoming from "./UpComing";
import BackDrop from "../BackDrop/backDrop";

//refresh wait
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const RATIO_ANIMATION = width * 0.8;
const ESPACIO_LATERAL = (width - RATIO_ANIMATION) / 2;
const ESPACIO = 9;

const MovieListScreenNowShowing = () => {
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
    console.log(type[0].name);
  };
  //current date Timestring
  const start = moment().format("YYYYMMDD");

  //data read from Show collection Firebase
  const [showData, setShowData] = useState([]);
  const showDataRef = firebase.firestore().collection("shows");
  const movieDataRef = firebase.firestore().collection("movies");
  const cinemaRef = firebase.firestore().collection("cinemas");

  const [data, setData] = useState([]);

  const getDataShow = async () => {
    let data = [];
    let movieData = [];
    await showDataRef.where("date", "==", start).onSnapshot((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        data.indexOf(doc.data().movieId) === -1 //data filter and push
          ? data.push(doc.data().movieId)
          : null; //console.log("This item already exists");
      });
      setShowData(data);
      data.map(async (item, index) => {
        await getData(item);
      });
      setData(movieData);
    });
  };

  useEffect(() => {
    getDataShow();
  }, []);

  const getData = async (movieId) => {
    // let movieData;
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
    var showBtn = false;
    navigation.navigate("MovieDetailUser", { movie: movie });
  };

  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={MovieListStyle.container}>
      <SafeAreaView>
        <ScrollView key={Math.random()}>
          <BackDrop scrollX={scrollX} />

          <View style={MovieListStyle.Button}>
            <TouchableOpacity
              onPress={SearchMovieUr}
              style={MovieListStyle.buttonStyle}
            >
              <Text style={MovieListStyle.buttonTextStyle}> Search Movie</Text>
              <MaterialIcons
                name="search"
                size={30}
                color={WHITE}
                style={MovieListStyle.iconS}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginVertical: 45,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {type.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  MovieListStyle.selectedBtn,
                  item.checked && { backgroundColor: PRIMARY },
                ]}
                onPress={() => clickType(index)}
              >
                <Text
                  style={
                    item.checked
                      ? { color: "white", fontWeight: "bold", fontSize: 18 }
                      : { color: "black", fontWeight: "bold", fontSize: 18 }
                  }
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {!type[1].checked ? (
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
                snapToInterval={RATIO_ANIMATION}
                scrollEventThrottle={16}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index, navigation }) => {
                  const inputRange = [
                    (index - 1) * RATIO_ANIMATION,
                    index * RATIO_ANIMATION,
                    (index + 1) * RATIO_ANIMATION,
                  ];

                  const outputRange = [0, -50, 0];
                  const translateY = scrollX.interpolate({
                    inputRange,
                    outputRange,
                  });

                  return (
                    <View style={{ width: RATIO_ANIMATION }}>
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
                            // backgroundColor: "#fff",
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
          ) : (
            <MovieListScreenUpcoming />
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MovieListScreenNowShowing;
