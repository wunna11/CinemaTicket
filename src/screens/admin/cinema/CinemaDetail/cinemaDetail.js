import React, { useState, useEffect } from "react";
import { CinemaDetailStyle } from "./cinemaDetail.style";
import { LinearGradient } from "expo-linear-gradient";
import {
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  View,
  Alert,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Dialog } from "@rneui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { firebase } from "../../../../../config";
import { getStorage, ref, deleteObject } from "firebase/storage";

// Components
import { LoadingScreen } from "../../../../components/Loading/LoadingScreen";
import { MovieCardSmall } from "../../../../components/Card/MovieCardSmall";
import { PrimaryButton } from "../../../../components/Button/PrimaryButton";
import { TertiaryButton } from "../../../../components/Button/TertiaryButton";
import { BLACK, WHITE } from "../../../../utils/styles/color";

const CinemaDetailScreen = ({ route, navigation }) => {
  const { cinema } = route.params;
  const { showBtnEdit } = route.params;

  // FireBase
  const cinemaDataRef = firebase.firestore().collection("cinemas");
  const showDataRef = firebase.firestore().collection("shows");
  const movieDataRef = firebase.firestore().collection("movies");
  const storage = getStorage();

  // DataList
  const [movieData, setMovieData] = useState([]);

  // Loading
  const [isLoading, setLoading] = useState(false);

  // Seat Visible button
  const [seatVisible, setSeatVisible] = useState(false);
  const triggerSeatVisible = () => {
    setSeatVisible(!seatVisible);
  };

  // Action button
  const [btnVisible, setBtnVisible] = useState(false);

  // Delete Dialog
  const [visibleDialog, setVisibleDialog] = useState(false);
  const toggleDialog = () => {
    setVisibleDialog(!visibleDialog);
  };

  const getData = async () => {
    setLoading(true);
    await showDataRef
      .where("cinemaId", "==", cinema.id)
      .onSnapshot(async (querySnapshot) => {
        const showList = [];
        querySnapshot.forEach(async (doc) => {
          const show = doc.data();
          show.id = doc.id;
          showList.push(show);
        });

        const mIds = showList.map((s) => s.movieId);
        const filterMIds = mIds.filter(
          (item, pos) => mIds.indexOf(item) == pos
        );
        let mData = [];
        filterMIds.map(async (mId) => {
          movieDataRef
            .doc(mId)
            .get()
            .then((snapshot) => {
              const movie = snapshot.data();
              movie.id = snapshot.id;
              mData.push(movie);
            });
        });
        setMovieData(mData);
      });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getData();
  }, []);

  // Delete Movie Action
  const deleteCinema = async () => {
    deleteOldImage(cinema.image);
    cinemaDataRef
      .doc(cinema.id)
      .delete()
      .then(() => {
        Alert.alert("Deleted Cinema", "Cinema is Deleted Successfully.");
        navigation.navigate("CinemaList");
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };

  // Delete Image From Server
  const deleteOldImage = (imgUrl) => {
    const oriFileName = imgUrl.split("%2F")[1].split("?")[0];
    var imgLink = "cinemas/" + oriFileName;

    const desertRef = ref(storage, imgLink);
    deleteObject(desertRef)
      .then(() => {
        // console.log("Image deleted from Storage");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  // Render Seating and Their Price
  const RenderSeating = () => {
    let seating = [];
    let rowNumb = parseInt(cinema.seatRow);
    let rowName = String.fromCharCode(64 + rowNumb);
    let nextRowPrice = null;
    let seatingPrice = [];

    // Seating Price
    for (let index = 0; index < cinema.seatRow; index++) {
      nextRowPrice =
        cinema.seatPrice[String.fromCharCode(rowName.charCodeAt(0) - 1)];
      seatingPrice.push(
        <View style={CinemaDetailStyle.seatAndPriceBox} key={index}>
          <View style={CinemaDetailStyle.seatPriceBox}>
            <Text style={CinemaDetailStyle.seatPriceBoxText}>{rowName}</Text>
          </View>
          <Text style={CinemaDetailStyle.seatPriceText}>
            {cinema.seatPrice[rowName]}
          </Text>
        </View>
      );
      rowName = String.fromCharCode(rowName.charCodeAt(0) - 1);
    }

    // Seating Map View
    rowName = String.fromCharCode(64 + rowNumb);
    for (let index = 0; index < cinema.seatRow; index++) {
      let seatingRow = [];
      for (let index = 1; index <= cinema.seatCol; index++) {
        seatingRow.push(
          <View style={CinemaDetailStyle.seatGridBox} key={index}>
            <View style={CinemaDetailStyle.seatBox}>
              <Text style={CinemaDetailStyle.seatBoxText}>
                {rowName}
                {index}
              </Text>
            </View>
          </View>
        );
      }
      seating.push(
        <View style={CinemaDetailStyle.seatRow} key={index}>
          {seatingRow}
        </View>
      );
      rowName = String.fromCharCode(rowName.charCodeAt(0) - 1);
    }

    return (
      <View style={CinemaDetailStyle.seatingContainer}>
        <View style={CinemaDetailStyle.seatMapViewContainer}>
          <Image
            source={require("../../../../../assets/img/projector.png")}
            style={CinemaDetailStyle.projectorImg}
          />
          {seating}
        </View>
        <View style={CinemaDetailStyle.seatPriceContainer}>{seatingPrice}</View>
      </View>
    );
  };

  // Render FlatList
  const renderItem = ({ item }) => {
    return (
      <View style={CinemaDetailStyle.cardBox}>
        <MovieCardSmall movie={item} linking={false} />
      </View>
    );
  };

  const RenderHeaderComponent = () => {
    return (
      <View style={CinemaDetailStyle.headerComponent}>
        <View style={CinemaDetailStyle.blackSpace}></View>
        <View style={CinemaDetailStyle.fillSpace}>
          <View style={CinemaDetailStyle.cinemaInfoBox}>
            <Text style={CinemaDetailStyle.cinemaName}>{cinema.name}</Text>
            <Text style={CinemaDetailStyle.cinemaCity}>{cinema.city}</Text>
            <Text style={CinemaDetailStyle.cinemaInfo}>
              Phone: {cinema.phone}
            </Text>
            <Text style={CinemaDetailStyle.cinemaInfo}>
              Email: {cinema.email}
            </Text>
            <Text style={CinemaDetailStyle.cinemaInfo}>
              Address: {cinema.address}
            </Text>
          </View>
          {seatVisible ? (
            <>
              <PrimaryButton
                title="Hide Seat Plan"
                onPress={triggerSeatVisible}
              />
              <RenderSeating />
            </>
          ) : (
            <PrimaryButton
              title="Show Seat Plan"
              onPress={triggerSeatVisible}
            />
          )}
          <Text style={CinemaDetailStyle.movieListTitle}>Now Showing</Text>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={CinemaDetailStyle.mainContainer}>
      <View style={CinemaDetailStyle.container}>
        <ImageBackground
          style={CinemaDetailStyle.cinemaImage}
          source={{
            uri: cinema.image,
          }}
        >
          <FlatList
            data={movieData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            enableEmptySections={true}
            onEndReached={() => {}}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={RenderHeaderComponent}
          />
        </ImageBackground>
        <LinearGradient
          colors={[BLACK, "transparent"]}
          style={CinemaDetailStyle.header}
        >
          <View style={CinemaDetailStyle.headerRow}>
            <View style={CinemaDetailStyle.headerRow}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons
                  name="arrow-left"
                  color={WHITE}
                  size={36}
                />
              </TouchableOpacity>
              <Text style={CinemaDetailStyle.headerTitle}>Cinema Detail</Text>
            </View>
            {showBtnEdit ? (
              <TouchableOpacity
                onPress={() => {
                  setBtnVisible(!btnVisible);
                }}
              >
                <MaterialCommunityIcons
                  name="playlist-edit"
                  color={WHITE}
                  size={36}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          {btnVisible ? (
            <View style={CinemaDetailStyle.actionBtnBox}>
              <PrimaryButton
                title="Edit"
                onPress={() =>
                  navigation.navigate("CinemaEdit", { cinema: cinema })
                }
              />
              <PrimaryButton title="Delete" onPress={toggleDialog} />
            </View>
          ) : null}
        </LinearGradient>
      </View>
      <Dialog isVisible={visibleDialog} onBackdropPress={toggleDialog}>
        <Dialog.Title title="Delete" />
        <Text style={CinemaDetailStyle.dialogText}>
          Going to delete Cinema from Server. Are You Sure?
        </Text>
        <View style={CinemaDetailStyle.dialogBtnRow}>
          <View style={CinemaDetailStyle.dialogBtn}>
            <TertiaryButton title="Delete" onPress={deleteCinema} />
          </View>
          <View style={CinemaDetailStyle.dialogBtn}>
            <PrimaryButton title="Cancle" onPress={toggleDialog} />
          </View>
        </View>
      </Dialog>
    </SafeAreaView>
  );
};

export default CinemaDetailScreen;
