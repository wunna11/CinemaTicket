import React, { useState, useEffect, useRef, useCallback } from "react";
import { MovieDetailStyle } from "./movieDetail.style";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Button,
} from "react-native";
import { Dialog } from "@rneui/themed";
import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { firebase } from "../../../../../config";
import { getStorage, ref, deleteObject } from "firebase/storage";
import YoutubePlayer from "react-native-youtube-iframe";

// Components
import { LoadingScreen } from "../../../../components/Loading/LoadingScreen";
import { PrimaryButton } from "../../../../components/Button/PrimaryButton";
import { TertiaryButton } from "../../../../components/Button/TertiaryButton";
import { BLACK, SECONDARY, WHITE } from "../../../../utils/styles/color";
import { SafeAreaView } from "react-native";

const MovieDetailScreen = ({ route, navigation }) => {
  const { movie } = route.params;
  const { showBtn } = route.params;
  // Firebase
  const dataRef = firebase.firestore().collection("movies");
  const showDataRef = firebase.firestore().collection("shows");
  const cinemaDataRef = firebase.firestore().collection("cinemas");
  const storage = getStorage();

  // Data List
  const [showData, setShowData] = useState([]);
  const [cinemaList, setCinemaList] = useState([]);
  const [dateList, setDateList] = useState([]);

  const dateListRef = useRef(dateList);

  // Loading
  const [isLoading, setLoading] = useState(false);

  //refresh
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // Delete Dialog
  const [visibleDialog, setVisibleDialog] = useState(false);
  const toggleDialog = () => {
    setVisibleDialog(!visibleDialog);
  };

  // Delete Movie Action
  const deleteMovie = async () => {
    deleteOldImage(movie.imagePoster);
    deleteOldImage(movie.imageCover);
    dataRef
      .doc(movie.id)
      .delete()
      .then(() => {
        // setTitle("");
      })
      .then(() => {
        alert("Deleted Movie");
        navigation.navigate("MovieList");
      })
      .catch((error) => {
        alert(error);
      });
  };

  // Delete Image from Server
  const deleteOldImage = (imgUrl) => {
    const oriFileName = imgUrl.split("%2F")[1].split("?")[0];
    var imgLink = "movies/" + oriFileName;

    const desertRef = ref(storage, imgLink);
    deleteObject(desertRef)
      .then(() => {
        // console.log("Image deleted from Storage");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  //Youtube Player
  const [playing, setPlaying] = useState(false);

  const onStateChangeVideoPlayer = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const getData = async () => {
    setLoading(true);
    // Get Shows List of the Movie
    const data = [];
    await showDataRef
      .where("movieId", "==", movie.id)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const show = doc.data();
          show.id = doc.id;
          data.push(show);
        });
        setShowData(data);
        getCinemaName(data);
        getDateList(data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  const getCinemaName = (movielist) => {
    // Filter Duplicated Cinema
    const cId = movielist.map((s) => s.cinemaId);
    const filterCId = cId.filter((item, pos) => cId.indexOf(item) == pos);

    const cData = [];
    filterCId.map((cId) => {
      cinemaDataRef
        .doc(cId)
        .get()
        .then((snapshot) => {
          let cinemaData = snapshot.data();
          cData.push({
            name: cinemaData.name,
            city: cinemaData.city,
          });
        });
    });
    setCinemaList(cData);
  };

  const getDateList = (movielist) => {
    const showDates = movielist.map((s) => s.date);
    const fileterShowDate = showDates.filter(
      (item, pos) => showDates.indexOf(item) == pos
    );
    setDateList(fileterShowDate);
  };
  useEffect(() => {
    getData();
  }, []);

  const RenderDateList = () => {
    const rendering = dateList.map((d) => {
      return (
        <View style={MovieDetailStyle.dateBox}>
          <Text style={MovieDetailStyle.dateText1}>
            {moment(d).format("ddd").toUpperCase()}
          </Text>
          <Text style={MovieDetailStyle.dateText2}>
            {moment(d).format("D")}
          </Text>
        </View>
      );
    });
    return (
      <>
        <View style={MovieDetailStyle.dateContainer}>{rendering}</View>
      </>
    );
  };

  const RenderCinemaList = () => {
    const rendering = cinemaList.map((c) => {
      return (
        <>
          <TouchableOpacity style={MovieDetailStyle.cinemaBox} key={c.id}>
            <Text style={MovieDetailStyle.cinemaBoxText}>{c.name}</Text>
            <Text style={MovieDetailStyle.cinemaBoxText2}>{c.city}</Text>
          </TouchableOpacity>
        </>
      );
    });
    return (
      <>
        <View style={MovieDetailStyle.cinemaContainer}>{rendering}</View>
      </>
    );
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <SafeAreaView style={MovieDetailStyle.mainContainer}>
        <View style={MovieDetailStyle.container}>
          <ImageBackground
            source={{ uri: movie.imageCover }}
            style={MovieDetailStyle.movieCoverImage}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
            >
              <View style={MovieDetailStyle.blackSpace}></View>
              <View style={MovieDetailStyle.fillSpace}>
                <View>
                  <Text style={MovieDetailStyle.subHeader}>Movie Trailer</Text>
                  <YoutubePlayer
                    height={300}
                    play={playing}
                    videoId={movie.trailer}
                    onChangeState={onStateChangeVideoPlayer}
                  />
                </View>
                <View style={MovieDetailStyle.headerContainer}>
                  <Image
                    style={MovieDetailStyle.moviePosterImage}
                    source={{ uri: movie.imagePoster }}
                  />
                  <View style={MovieDetailStyle.movieTitleBox}>
                    <View>
                      <Text style={MovieDetailStyle.movieTitle}>
                        {movie.title}
                      </Text>
                    </View>
                    <View>
                      <Text style={MovieDetailStyle.movieTitleInfoText}>
                        {movie.year}
                      </Text>
                      <Text style={MovieDetailStyle.movieTitleInfoText}>
                        {movie.runtime}
                      </Text>
                      <View style={MovieDetailStyle.imdbRateStyle}>
                        <Image
                          style={MovieDetailStyle.imdbImage}
                          source={require("../../../../../assets/img/imdb_logo.png")}
                        />
                        <Text style={MovieDetailStyle.movieTitleInfoText}>
                          {movie.imdbRating}/10
                        </Text>
                        <View style={MovieDetailStyle.ratedBox}>
                          <Text style={MovieDetailStyle.ratedText}>
                            {movie.rated}
                          </Text>
                        </View>
                      </View>
                      <Text style={MovieDetailStyle.movieTitleInfoText}>
                        {movie.category}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={MovieDetailStyle.bodyContainer}>
                  <View>
                    <Text style={MovieDetailStyle.subHeader}>Director</Text>
                    <Text style={MovieDetailStyle.movieInfoText}>
                      {movie.director}
                    </Text>
                  </View>
                  <View>
                    <Text style={MovieDetailStyle.subHeader}>Cast</Text>
                    <Text style={MovieDetailStyle.movieInfoText}>
                      {movie.cast}
                    </Text>
                  </View>
                  <View>
                    <Text style={MovieDetailStyle.subHeader}>Overview</Text>
                    <Text style={MovieDetailStyle.movieInfoText}>
                      {movie.overview}
                    </Text>
                  </View>
                  {/* <Text style={MovieDetailStyle.subHeader}>Show Date</Text>
                <RenderDateList /> */}
                  <Text style={MovieDetailStyle.subHeader}>Showing At</Text>
                  <RenderCinemaList cinemas={cinemaList} />
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
          <LinearGradient
            // Button Linear Gradient
            colors={[BLACK, "transparent"]}
            style={MovieDetailStyle.header}
          >
            <View style={MovieDetailStyle.headerRow}>
              <TouchableOpacity
                style={MovieDetailStyle.headerBackBtn}
                onPress={() => navigation.goBack()}
              >
                <MaterialCommunityIcons
                  name="arrow-left"
                  color={WHITE}
                  size={36}
                />
              </TouchableOpacity>
              <Text style={MovieDetailStyle.headerTitle}>Movie Detail</Text>
            </View>
          </LinearGradient>
        </View>
        <Dialog isVisible={visibleDialog} onBackdropPress={toggleDialog}>
          <Dialog.Title title="Delete" />
          <Text style={MovieDetailStyle.dialogText}>
            Going to delete Movie from Server. Are You Sure?
          </Text>
          <View style={MovieDetailStyle.dialogBtnRow}>
            <View style={MovieDetailStyle.dialogBtn}>
              <TertiaryButton title="Delete" onPress={deleteMovie} />
            </View>
            <View style={MovieDetailStyle.dialogBtn}>
              <PrimaryButton title="Cancle" onPress={toggleDialog} />
            </View>
          </View>
        </Dialog>
      </SafeAreaView>
    </>
  );
};

export default MovieDetailScreen;