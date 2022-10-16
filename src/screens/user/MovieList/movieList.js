import React, { useEffect, useState, useRef } from "react";
import { MovieListStyle } from "./movieList.style";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  RefreshControl,
  StatusBar,
} from "react-native";
import { firebase } from "../../../../config";
import MovieListScreenNowShowing from "../NowShowingMovie/NowShowing";
import { PRIMARY } from "../../../utils/styles/color";
//refresh wait
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const MovieListScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const showDataRef = firebase.firestore().collection("shows");
  const movieDataRef = firebase.firestore().collection("movies");
  const cinemaRef = firebase.firestore().collection("cinemas");

  // Loading
  const [isLoading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await movieDataRef
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach(async (doc) => {
          const movie = doc.data();
          movie.id = doc.id;

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
              data.push(movie);
            });
        });
        setData(data);
      });
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    getData();
  }, []);

  const MovieDetailUSER = (item) => {
    var showBtn = false;
    navigation.navigate("Booking Ticket", { item });
  };

  //refresh
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <>
      <StatusBar backgroundColor={PRIMARY} />
      <View style={MovieListStyle.container}>
        <SafeAreaView>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View>
              <MovieListScreenNowShowing />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};

export default MovieListScreen;
