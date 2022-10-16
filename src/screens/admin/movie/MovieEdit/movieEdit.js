import React, { useState, useEffect } from "react";
import { MovieEditStyle } from "./movieEdit.style";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../../../../config";
import { getStorage, ref, deleteObject } from "firebase/storage";

// Components
import { UserTextInput } from "../../../../components/Input/UserTextInput";
import { SelectBox } from "../../../../components/Input/SelectBox";
import { PrimaryButton } from "../../../../components/Button/PrimaryButton";
import { SecondaryButton } from "../../../../components/Button/SecondaryButton";
import { PRIMARY, SECONDARY, WHITE } from "../../../../utils/styles/color";

const MovieEditScreen = ({ route, navigation }) => {
  // Route Params
  const { movie } = route.params;

  // Firebase
  const movieDataRef = firebase.firestore().collection("movies");
  const showDataRef = firebase.firestore().collection("shows");
  const cinemaDataRef = firebase.firestore().collection("cinemas");
  const storage = getStorage();
  const [cinemaList, setCinemaList] = useState([]);

  // Input Data - Movie
  const [posterImg, setPosterImg] = useState({ uri: movie.imagePoster });
  const [posterImgUpdate, setPosterImgUpdate] = useState(null);
  const [coverImg, setCoverImg] = useState({ uri: movie.imageCover });
  const [coverImgUpdate, setCoverImgUpdate] = useState(null);
  const [title, setTitle] = useState(movie.title);
  const [trailer, setTrailer] = useState(movie.trailer);
  const [year, setYear] = useState(movie.year);
  const [runtime, setRuntime] = useState(movie.runtime);
  const [imdbRating, setImdbRating] = useState(movie.imdbRating);
  const [rated, setRated] = useState("");
  const rated_list = ["G", "PG", "PG-13", "R", "NR"];
  const [category, setCategory] = useState("");
  const category_list = ["Action", "Comedy", "Drama", "Romance", "Sci-Fi"];
  const [director, setDirector] = useState(movie.director);
  const [cast, setCast] = useState(movie.cast);
  const [overview, setOverview] = useState(movie.overview);
  // Input Data - Show
  const [cinemaIds, setCinemaIds] = useState(
    route.params.movieCinemaList.map((c) => c.id)
  );
  const [dateArr, setDateArr] = useState(route.params.movieDateList);
  const [startTime, setStartTime] = useState(route.params.movieShowTimeList);
  // Loading
  const [isUploading, setIsUploading] = useState(false);

  // Show Old Value for Select Box
  const matchWithOldValue = (arrList, oldValue, setValue) => {
    arrList.forEach(function callback(value, index) {
      if (value == oldValue) {
        setValue(index);
      }
    });
  };

  useEffect(() => {
    matchWithOldValue(rated_list, movie.rated, setRated);
    matchWithOldValue(category_list, movie.category, setCategory);
  }, []);

  // Movie Image - Poster/Cover
  const pickPosterImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const source = { uri: result.uri };
      setPosterImgUpdate(source);
    }
  };
  const pickCoverPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const source = { uri: result.uri };
      setCoverImgUpdate(source);
    }
  };

  // Naming for Uploaded Image in Server Storage
  const namingFile = (timestamp, modification) => {
    var currentDate = moment(timestamp)
      .utcOffset("+06:30")
      .format("YYYYMMDDhhmmss");
    var replaceText = title.replace(/ /g, "_");
    if (modification) {
      var filename = currentDate + "_movie_" + replaceText + "_" + modification;
    } else {
      var filename = currentDate + "_movie_" + replaceText;
    }
    return filename;
  };

  // Create Custom Id for Document
  const getCustomShowId = (cId, showDate) => {
    var cinemeReText = cId.substring(0, 6);
    var dateReText = moment(showDate).format("YYYYMMMDD");
    var filename = cinemeReText + dateReText + startTime;
    return filename;
  };

  // Delete Old Image at Server
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

  // Get Cinema List from Server
  const getCinemaData = () => {
    cinemaDataRef.onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const { name } = doc.data();
        const { city } = doc.data();

        data.push({
          id: doc.id,
          name,
          city,
        });
      });
      setCinemaList(data);
    });
  };

  // Manage Date Array Listing
  const dateListing = (comingDate, removeItem = false) => {
    const sortDate = (dArr) => dArr.sort((x, y) => x - y);
    if (removeItem) {
      let tempArr = dateArr.filter((d) => d != comingDate);
      setDateArr(() => sortDate(tempArr));
    } else {
      let isExist = false;
      // let comDateFormat = moment(comingDate).format("YMD");
      let comDateFormat = comingDate;
      dateArr.forEach((d) => {
        d == comDateFormat ? (isExist = true) : null;
      });
      // Put Selected
      !isExist ? setDateArr(() => sortDate([...dateArr, comingDate])) : null;
    }
  };

  // Date Picker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleDPConfirm = (date) => {
    var tempDate = moment(date).utcOffset("+06:30").format("YYYYMMDD");
    dateListing(tempDate);
    hideDatePicker();
  };

  // Time Picker
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleTPConfirm = (time) => {
    var tempTime = moment(time).utcOffset("+06:30").format("HHmm");
    setStartTime(tempTime);
    hideTimePicker();
  };

  // Filter Id of Youtube Link
  const filterVidOfYTube = (link) => {
    let id = link.split("/")[3] ? link.split("/")[3] : link.split("/")[0];
    return id;
  };

  // Upload Movie and Show Data
  const updateMovieAndShow = async () => {
    setIsUploading(true);
    const serverTime = firebase.firestore.Timestamp.now().toDate().toString();
    if (title && title.length > 0) {
      // Upload Image to Storage
      var posterImgUrl;
      var coverImgUrl;
      // Poster Image Upload Request
      if (posterImgUpdate != null) {
        //Check Image Change or not
        const responsePoster = await fetch(posterImgUpdate.uri);
        const blobPoster = await responsePoster.blob();
        const filenamePoster = namingFile("poster");
        var ref = firebase
          .storage()
          .ref("movies/")
          .child(filenamePoster)
          .put(blobPoster);
        try {
          await ref;
        } catch (e) {
          console.log(e);
        }
        posterImgUrl = await firebase
          .storage()
          .ref(`movies/${filenamePoster}`)
          .getDownloadURL();

        // Delete Old Image in Storage
        deleteOldImage(posterImg.uri);
      } else {
        // Keep old image link
        posterImgUrl = posterImg.uri;
      }

      // Cover Image Upload Request
      if (coverImgUpdate != null) {
        //Check Image Change or not
        const responseCover = await fetch(coverImgUpdate.uri);
        const blobCover = await responseCover.blob();
        const filenameCover = namingFile("cover");
        var ref = firebase
          .storage()
          .ref("movies/")
          .child(filenameCover)
          .put(blobCover);
        try {
          await ref;
        } catch (e) {
          console.log(e);
        }
        coverImgUrl = await firebase
          .storage()
          .ref(`movies/${filenameCover}`)
          .getDownloadURL();
        // Delete Old Image in Storage
        deleteOldImage(coverImg.uri);
      } else {
        // Keep old image link
        coverImgUrl = coverImg.uri;
      }

      // Sending Movie Data to serve
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      movieDataRef
        .doc(movie.id)
        .update({
          imagePoster: posterImgUrl,
          imageCover: coverImgUrl,
          title: title,
          year: year,
          trailer: trailer,
          runtime: runtime,
          imdbRating: imdbRating,
          rated: rated_list[rated],
          category: category_list[category],
          director: director,
          cast: cast,
          overview: overview,
          updatedAt: timestamp,
        })
        .then(async () => {
          // Delete Shows of The Movie
          var showsOfMovie_query = showDataRef.where("movieId", "==", movie.id);
          await showsOfMovie_query.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => doc.ref.delete());
          });

          // Create Shows(s) based on Cinema and Date
          cinemaIds.map((cineId) => {
            dateArr.map((date) => {
              const showId = getCustomShowId(cineId, date);
              showDataRef
                .doc(showId)
                .set({
                  movieId: movie.id,
                  cinemaId: cineId,
                  date: date,
                  startTime: startTime,
                  createdAt: timestamp,
                  updatedAt: timestamp,
                })
                .catch((error) => {
                  alert(error);
                });
            });
          });
        })
        .then(() => {
          Alert.alert("Movie Edit", "Movie and Show are successfully Updated");
          navigation.navigate("MovieList");
        })

        .catch((error) => {
          Alert.alert("Error", error);
        });
    } else {
      Alert.alert("Input Data", "Field Required");
    }
    setIsUploading(false);
  };

  const cancleAction = () => {
    navigation.goBack();
  };

  // Use Effect
  useEffect(() => {
    getCinemaData();
  }, []);

  // Button Group of Cinema List
  const RenderCinemaList = () => {
    const selectCinema = (addId) => {
      let isExist = false;
      cinemaIds.forEach((cId) => {
        cId == addId ? (isExist = true) : null;
      });
      if (isExist) {
        // Remove selected
        let tempArr = cinemaIds.filter((id) => id != addId);
        setCinemaIds(tempArr);
      } else {
        // Put Select Id to List
        setCinemaIds([...cinemaIds, addId]);
      }
    };

    const cinemaButtons = cinemaList.map((item, i) => {
      if (cinemaIds.includes(item.id)) {
        return (
          <TouchableOpacity
            key={i}
            style={[MovieEditStyle.cinemaBox, MovieEditStyle.cinemaBoxSelected]}
            onPress={() => selectCinema(item.id)}
          >
            <Text style={MovieEditStyle.cinemaBoxText}>{item.name}</Text>
            <Text style={MovieEditStyle.cinemaBoxText2}>{item.city}</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            key={i}
            style={MovieEditStyle.cinemaBox}
            onPress={() => selectCinema(item.id)}
          >
            <Text style={MovieEditStyle.cinemaBoxText}>{item.name}</Text>
            <Text style={MovieEditStyle.cinemaBoxText2}>{item.city}</Text>
          </TouchableOpacity>
        );
      }
    });

    return (
      <>
        <Text style={MovieEditStyle.titleLabel}>Cinema</Text>
        <View style={MovieEditStyle.cinemaContainer}>{cinemaButtons}</View>
      </>
    );
  };

  // Render Picking Date and List of Date
  const RenderDateList = () => {
    const dateList = dateArr.map((date, i) => {
      return (
        <TouchableOpacity
          key={i}
          style={MovieEditStyle.dateBox}
          onPress={() => dateListing(date, true)}
        >
          <Text style={MovieEditStyle.dateBoxText}>
            {moment(date).format("D MMM")}
          </Text>
        </TouchableOpacity>
      );
    });
    return (
      <>
        <Text style={MovieEditStyle.titleLabel}>Date</Text>
        <View style={MovieEditStyle.dateContainer}>
          {dateList}
          <TouchableOpacity
            style={[MovieEditStyle.dateBox, MovieEditStyle.datePickBtn]}
            onPress={showDatePicker}
          >
            <MaterialCommunityIcons name="plus" color={WHITE} size={36} />
            <Text style={MovieEditStyle.datePickBtnText}>Pick Date</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <>
      <ScrollView>
        <SafeAreaView style={MovieEditStyle.container}>
          <Text style={MovieEditStyle.title}>Movie</Text>
          <View style={MovieEditStyle.headerContainer}>
            <View>
              <Text style={MovieEditStyle.imgLabel}>Poster</Text>
              <TouchableOpacity onPress={pickPosterImg}>
                {posterImg ? (
                  <Image
                    source={
                      posterImgUpdate
                        ? { uri: posterImgUpdate.uri }
                        : { uri: posterImg.uri }
                    }
                    style={MovieEditStyle.posterImgStyle}
                  />
                ) : (
                  <View style={MovieEditStyle.posterImgStyle}>
                    <MaterialCommunityIcons
                      name="shape-square-rounded-plus"
                      color={WHITE}
                      size={48}
                    />
                    <Text style={MovieEditStyle.imgUploadText}>
                      Poster Upload
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View>
              <Text style={MovieEditStyle.imgLabel}>Cover</Text>
              <TouchableOpacity onPress={pickCoverPhoto}>
                {coverImg ? (
                  <Image
                    source={
                      coverImgUpdate
                        ? { uri: coverImgUpdate.uri }
                        : { uri: coverImg.uri }
                    }
                    style={MovieEditStyle.coverImgStyle}
                  />
                ) : (
                  <View style={MovieEditStyle.coverImgStyle}>
                    <MaterialCommunityIcons
                      name="shape-square-rounded-plus"
                      color={WHITE}
                      size={48}
                    />
                    <Text style={MovieEditStyle.imgUploadText}>
                      Cover Upload
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={MovieEditStyle.bodyContainer}>
            <UserTextInput
              label="Title"
              placeholder="Enter Movie Title"
              value={title}
              setValue={setTitle}
            />
            <UserTextInput
              label="Year"
              placeholder="e.g. 2020"
              value={year}
              setValue={setYear}
              keyboardType="number-pad"
            />
            <UserTextInput
              label="Trailer Link"
              placeholder="Enter Youtube Video ID or Video Link"
              value={trailer}
              setValue={(text) => setTrailer(filterVidOfYTube(text))}
            />
            <UserTextInput
              label="Run Time"
              placeholder="e.g. 2hr 23min or 156min"
              value={runtime}
              setValue={setRuntime}
            />
            <UserTextInput
              label="IMDb Rating"
              placeholder="e.g. 8.7"
              value={imdbRating}
              setValue={setImdbRating}
              keyboardType="number-pad"
            />
            <SelectBox
              label="Rated"
              value={rated}
              list={rated_list}
              setValue={setRated}
            />
            <SelectBox
              label="Category"
              value={category}
              list={category_list}
              setValue={setCategory}
            />
            <UserTextInput
              label="Director"
              placeholder="Enter Movie Director"
              value={director}
              setValue={setDirector}
            />
            <UserTextInput
              label="Cast"
              placeholder="Enter Cast List in Movie"
              multiline={true}
              numberOfLines={2}
              value={cast}
              setValue={setCast}
            />
            <UserTextInput
              label="Overview"
              placeholder="Enter Movie Overview"
              multiline={true}
              numberOfLines={4}
              value={overview}
              setValue={setOverview}
            />
          </View>
          <>
            <Text style={MovieEditStyle.title}>Show</Text>
            <RenderCinemaList />
            <RenderDateList />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDPConfirm}
              onCancel={hideDatePicker}
            />

            <Text style={MovieEditStyle.titleLabel}>Start Time</Text>
            {startTime ? (
              <TouchableOpacity
                style={MovieEditStyle.timeBox}
                onPress={showTimePicker}
              >
                <Text style={MovieEditStyle.timeBoxText}>
                  {moment(startTime, "HH:mm").format("hh:mm A")}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={MovieEditStyle.timeBoxBtn}
                onPress={showTimePicker}
              >
                <MaterialCommunityIcons
                  name="clock-plus-outline"
                  color={SECONDARY}
                  size={24}
                />
                <Text style={MovieEditStyle.timeBoxBtnText}>Pick Time</Text>
              </TouchableOpacity>
            )}
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTPConfirm}
              onCancel={hideTimePicker}
            />
          </>
          <View style={MovieEditStyle.btnBox}>
            <PrimaryButton title="Update" onPress={updateMovieAndShow} />
            <SecondaryButton title="Cancel" onPress={cancleAction} />
          </View>
        </SafeAreaView>
      </ScrollView>

      <LinearGradient // Sticky Header
        colors={[WHITE, "transparent"]}
        style={MovieEditStyle.header}
      >
        <View style={MovieEditStyle.headerRow}>
          <TouchableOpacity
            style={MovieEditStyle.headerBackBtn}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              color={PRIMARY}
              size={36}
            />
          </TouchableOpacity>
          <Text style={MovieEditStyle.headerTitle}>Movie Edit</Text>
        </View>
      </LinearGradient>
      {isUploading ? (
        <Modal visible={true} transparent={true} animationType="fade">
          <View style={MovieEditStyle.modalContainer}>
            <ActivityIndicator
              size="large"
              color={PRIMARY}
              style={MovieEditStyle.modalLoadingCircle}
            />
            <Text style={MovieEditStyle.modalText}>Uploading.....</Text>
          </View>
        </Modal>
      ) : null}
    </>
  );
};

export default MovieEditScreen;
