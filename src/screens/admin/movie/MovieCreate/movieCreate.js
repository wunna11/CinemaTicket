import React, { useState, useEffect } from "react";
import { MovieCreateStyle } from "./movieCreate.style";
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

// Components
import { UserTextInput } from "../../../../components/Input/UserTextInput";
import { SelectBox } from "../../../../components/Input/SelectBox";
import { PrimaryButton } from "../../../../components/Button/PrimaryButton";
import { SecondaryButton } from "../../../../components/Button/SecondaryButton";
import { PRIMARY, SECONDARY, WHITE } from "../../../../utils/styles/color";

const MovieCreateScreen = () => {
  const navigation = useNavigation();

  // Firebase
  const movieDataRef = firebase.firestore().collection("movies");
  const showDataRef = firebase.firestore().collection("shows");
  const cinemaDataRef = firebase.firestore().collection("cinemas");
  const [cinemaList, setCinemaList] = useState([]);

  // Input Data - Movie
  const [posterImg, setPosterImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [title, setTitle] = useState("");
  const [trailer, setTrailer] = useState("");
  const [year, setYear] = useState("");
  const [runtime, setRuntime] = useState("");
  const [imdbRating, setImdbRating] = useState("");
  const [rated, setRated] = useState("");
  const rated_list = ["G", "PG", "PG-13", "R", "NR"];
  const [category, setCategory] = useState("");
  const category_list = ["Action", "Comedy", "Drama", "Romance", "Sci-Fi"];
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState("");
  const [overview, setOverview] = useState("");
  // Input Data - Show
  const [cinemaIds, setCinemaIds] = useState([]);
  const [dateArr, setDateArr] = useState([]);
  const [startTime, setStartTime] = useState("");
  // Loading
  const [isUploading, setIsUploading] = useState(false);

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
      setPosterImg(source);
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
      setCoverImg(source);
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
  const getCustomMovieId = (timestamp) => {
    var currentDate = moment(timestamp)
      .utcOffset("+06:30")
      .format("YYMMDDhhmmss");
    var filename = "MoVi" + currentDate;
    return filename;
  };
  
  const getCustomShowId = (cId, showDate) => {
    var cinemeReText = cId.substring(0, 6);
    var dateReText = moment(showDate).format("YYYYMMMDD");
    var filename = cinemeReText + dateReText + startTime;
    return filename;
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
  const uploadMovieAndShow = async () => {
    setIsUploading(true);
    const serverTime = firebase.firestore.Timestamp.now().toDate().toString();
    if (posterImg !== null && coverImg !== null && title && title.length > 0) {
      // Upload Images to Storage
      const responsePoster = await fetch(posterImg.uri);
      const blobPoster = await responsePoster.blob();
      const filenamePoster = namingFile(serverTime, "poster");
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
      const posterImgUrl = await firebase
        .storage()
        .ref(`movies/${filenamePoster}`)
        .getDownloadURL();
      // Cover Image Upload
      const responseCover = await fetch(coverImg.uri);
      const blobCover = await responseCover.blob();
      const filenameCover = namingFile(serverTime, "cover");
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
      const coverImgUrl = await firebase
        .storage()
        .ref(`movies/${filenameCover}`)
        .getDownloadURL();

      // Sending Movie Data to serve
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const movieId = getCustomMovieId(serverTime);

      movieDataRef
        .doc(movieId)
        .set({
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
          createdAt: timestamp,
          updatedAt: timestamp,
        })
        .then(() => {
          // setTitle("");
        })
        .then(() => {
          // Create Shows(s) based on Cinema and Date
          cinemaIds.map((cineId) => {
            dateArr.map((date) => {
              const showId = getCustomShowId(cineId, date);
              showDataRef
                .doc(showId)
                .set({
                  movieId: movieId,
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
          Alert.alert(
            "Movie Create",
            "Movie and Show are successfully Created"
          );
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
            style={[
              MovieCreateStyle.cinemaBox,
              MovieCreateStyle.cinemaBoxSelected,
            ]}
            onPress={() => selectCinema(item.id)}
          >
            <Text style={MovieCreateStyle.cinemaBoxText}>{item.name}</Text>
            <Text style={MovieCreateStyle.cinemaBoxText2}>{item.city}</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
          key={i}
            style={MovieCreateStyle.cinemaBox}
            onPress={() => selectCinema(item.id)}
          >
            <Text style={MovieCreateStyle.cinemaBoxText}>{item.name}</Text>
            <Text style={MovieCreateStyle.cinemaBoxText2}>{item.city}</Text>
          </TouchableOpacity>
        );
      }
    });

    return (
      <>
        <Text style={MovieCreateStyle.titleLabel}>Cinema</Text>
        <View style={MovieCreateStyle.cinemaContainer}>{cinemaButtons}</View>
      </>
    );
  };

  // Render Picking Date and List of Date
  const RenderDateList = () => {
    const dateList = dateArr.map((date, i) => {
      return (
        <TouchableOpacity
          key={i}
          style={MovieCreateStyle.dateBox}
          onPress={() => dateListing(date, true)}
        >
          <Text style={MovieCreateStyle.dateBoxText}>
            {moment(date).format("D MMM")}
          </Text>
        </TouchableOpacity>
      );
    });
    return (
      <>
        <Text style={MovieCreateStyle.titleLabel}>Date</Text>
        <View style={MovieCreateStyle.dateContainer}>
          {dateList}
          <TouchableOpacity
            style={[MovieCreateStyle.dateBox, MovieCreateStyle.datePickBtn]}
            onPress={showDatePicker}
          >
            <MaterialCommunityIcons name="plus" color={WHITE} size={36} />
            <Text style={MovieCreateStyle.datePickBtnText}>Pick Date</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <>
      <ScrollView>
        <SafeAreaView style={MovieCreateStyle.container}>
          <Text style={MovieCreateStyle.title}>Movie</Text>
          <View style={MovieCreateStyle.headerContainer}>
            <View>
              <Text style={MovieCreateStyle.imgLabel}>Poster</Text>
              <TouchableOpacity onPress={pickPosterImg}>
                {posterImg ? (
                  <Image
                    source={posterImg ? { uri: posterImg.uri } : null}
                    style={MovieCreateStyle.posterImgStyle}
                  />
                ) : (
                  <View style={MovieCreateStyle.posterImgStyle}>
                    <MaterialCommunityIcons
                      name="shape-square-rounded-plus"
                      color={WHITE}
                      size={48}
                    />
                    <Text style={MovieCreateStyle.imgUploadText}>
                      Poster Upload
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View>
              <Text style={MovieCreateStyle.imgLabel}>Cover</Text>
              <TouchableOpacity onPress={pickCoverPhoto}>
                {coverImg ? (
                  <Image
                    source={coverImg ? { uri: coverImg.uri } : null}
                    style={MovieCreateStyle.coverImgStyle}
                  />
                ) : (
                  <View style={MovieCreateStyle.coverImgStyle}>
                    <MaterialCommunityIcons
                      name="shape-square-rounded-plus"
                      color={WHITE}
                      size={48}
                    />
                    <Text style={MovieCreateStyle.imgUploadText}>
                      Cover Upload
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={MovieCreateStyle.bodyContainer}>
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
            <Text style={MovieCreateStyle.title}>Show</Text>
            <RenderCinemaList />
            <RenderDateList />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDPConfirm}
              onCancel={hideDatePicker}
            />

            <Text style={MovieCreateStyle.titleLabel}>Start Time</Text>
            {startTime ? (
              <TouchableOpacity
                style={MovieCreateStyle.timeBox}
                onPress={showTimePicker}
              >
                <Text style={MovieCreateStyle.timeBoxText}>
                  {moment(startTime, "HHmm").format("hh:mm A")}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={MovieCreateStyle.timeBoxBtn}
                onPress={showTimePicker}
              >
                <MaterialCommunityIcons
                  name="clock-plus-outline"
                  color={SECONDARY}
                  size={24}
                />
                <Text style={MovieCreateStyle.timeBoxBtnText}>Pick Time</Text>
              </TouchableOpacity>
            )}
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTPConfirm}
              onCancel={hideTimePicker}
            />
          </>
          <View style={MovieCreateStyle.btnBox}>
            <PrimaryButton title="Create" onPress={uploadMovieAndShow} />
            <SecondaryButton title="Cancel" onPress={cancleAction} />
          </View>
        </SafeAreaView>
      </ScrollView>

      <LinearGradient // Sticky Header
        colors={[WHITE, "transparent"]}
        style={MovieCreateStyle.header}
      >
        <View style={MovieCreateStyle.headerRow}>
          <TouchableOpacity
            style={MovieCreateStyle.headerBackBtn}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              color={PRIMARY}
              size={36}
            />
          </TouchableOpacity>
          <Text style={MovieCreateStyle.headerTitle}>Movie Create</Text>
        </View>
      </LinearGradient>
      {isUploading ? (
        <Modal visible={true} transparent={true} animationType="fade">
          <View style={MovieCreateStyle.modalContainer}>
            <ActivityIndicator
              size="large"
              color={PRIMARY}
              style={MovieCreateStyle.modalLoadingCircle}
            />
            <Text style={MovieCreateStyle.modalText}>Uploading.....</Text>
          </View>
        </Modal>
      ) : null}
    </>
  );
};

export default MovieCreateScreen;
