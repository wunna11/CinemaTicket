import React, { useState, useEffect } from "react";
import { MovieListStyle } from "./movieList.style";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, StatusBar, Text, View } from "react-native";
import { firebase } from "../../../../../config";

// Components
import { LoadingScreen } from "../../../../components/Loading/LoadingScreen";
import { PRIMARY, SECONDARY, WHITE } from "../../../../utils/styles/color";
import { PrimaryButton } from "../../../../components/Button/PrimaryButton";
import { MovieCard } from "../../../../components/Card/MovieCard";
import { EndResult } from "../../../../components/Scoll/EndResult";
import { SafeAreaView } from "react-native";

const MovieListScreen = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const showDataRef = firebase.firestore().collection("shows");
  const movieDataRef = firebase.firestore().collection("movies");
  const cinemaRef = firebase.firestore().collection("cinemas");

  // Loading
  const [isLoading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    movieDataRef
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach(async (doc) => {
          const movie = doc.data();
          movie.id = doc.id;

          showDataRef
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
              // console.log(cId);
              // console.log("Filter : ",filterCId);
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
              // console.log("Cinema : ",cinemaData);

              movie.shows = showList;
              movie.showDate = filterDates;
              movie.showingAt = cinemaData;
              movie.showTime = filterShowTime[0];
              data.push(movie);
            });
          });
        setData(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        // setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // FlatList Render Components
  const renderItem = ({ item }) => <MovieCard movie={item} />;
  const renderHeader = () => {
    return <View style={MovieListStyle.headerComponent}></View>;
  };
  const renderFooter = () => {
    if (data[0] != null) {
      return (
        <View style={MovieListStyle.footerComponent}>
          <EndResult />
        </View>
      );
    } else {
      return (
        <View style={MovieListStyle.footerComponent}>
          <Text>No post to show</Text>
        </View>
      );
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <StatusBar backgroundColor={PRIMARY} />
      <SafeAreaView style={MovieListStyle.mainContainer}>
        <View style={MovieListStyle.container}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            // keyExtractor={(_,i) => String(i)}
            enableEmptySections={true}
            onEndReached={() => {}}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
          />
        </View>
        <LinearGradient
          style={MovieListStyle.header}
          colors={[WHITE, "transparent"]}
        >
          <View style={MovieListStyle.headerRow}>
            <Text style={MovieListStyle.headerTitle}>Movie</Text>
            <View style={MovieListStyle.headerBtn}>
              <PrimaryButton
                title="Create"
                onPress={() => navigation.navigate("MovieCreate")}
              />
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

export default MovieListScreen;
