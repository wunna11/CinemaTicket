import React, { useState, useEffect } from "react";
import { CinemaCreateStyle } from "./cinemaCreate.style";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../../../../config";

// Components
import { UserTextInput } from "../../../../components/Input/UserTextInput";
import { PrimaryButton } from "../../../../components/Button/PrimaryButton";
import { SelectBox } from "../../../../components/Input/SelectBox";
import { SecondaryButton } from "../../../../components/Button/SecondaryButton";
import { PRIMARY, WHITE } from "../../../../utils/styles/color";
import { TextInput } from "react-native";

const CinemaCreateScreen = () => {
  const navigation = useNavigation();

  // FireBase
  const cinemaDataRef = firebase.firestore().collection("cinemas");

  // Input Data
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [seatRow, setSeatRow] = useState();
  const seatRow_list = ["5", "6", "7", "8", "9", "10"];
  const [seatCol, setSeatCol] = useState();
  const seatCol_list = ["5", "6", "7", "8", "9", "10"];
  const [seatPrice, setSeatPrice] = useState({});

  // Loading
  const [isUploading, setIsUploading] = useState(false);

  // Choose Image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
    });

    if (!result.cancelled) {
      const source = { uri: result.uri };
      setImage(source);
    }
  };

  // Naming for Uploaded Image in Server Storage
  const namingFile = (timestamp) => {
    var currentDate = moment(timestamp)
      .utcOffset("+06:30")
      .format("YYYYMMDDhhmmss");
    var replaceText = name.replace(/ /g, "_");
    var filename = currentDate + "_cinema_" + replaceText;
    return filename;
  };

  // Create Custom Id for Document
  const getCustomCinemaId = (timestamp) => {
    var currentDate = moment(timestamp).utcOffset("+06:30").format("YYMMDD");
    var nameReFormat =
      name.charAt(0) +
      (name.split(/\s/g).pop() == ""
        ? name.charAt(0)
        : name.split(/\s/g).pop().charAt(0)
      ).toUpperCase();
    var cityReFormat = city.replace(/\s/g, "");
    cityReFormat =
      cityReFormat.charAt(0) +
      cityReFormat.charAt(cityReFormat.length - 1).toUpperCase();
    var filename = nameReFormat + "at" + cityReFormat + currentDate;
    return filename;
  };

  // Upload Cinema Data to Server
  const uploadCinema = async () => {
    setIsUploading(true);
    const serverTime = firebase.firestore.Timestamp.now().toDate().toString();
    if (image !== null && name && name.length > 0) {
      // Upload Image to Storage
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const filename = namingFile(serverTime);
      var ref = firebase.storage().ref("cinemas/").child(filename).put(blob);
      try {
        await ref;
      } catch (e) {
        console.log(e);
      }
      const imgUrl = await firebase
        .storage()
        .ref(`cinemas/${filename}`)
        .getDownloadURL();

      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const cinemaId = getCustomCinemaId(serverTime);

      // Sending Cinema Data to server
      cinemaDataRef
        .doc(cinemaId)
        .set({
          image: imgUrl,
          name: name,
          city: city,
          seatRow: parseInt(seatRow),
          seatCol: parseInt(seatCol),
          seatPrice: seatPrice,
          phone: phone,
          email: email,
          address: address,
          createdAt: timestamp,
          updatedAt: timestamp,
        })
        .then(() => {
          Alert.alert("Cinema Create", "Cinema is sucessfully created");
          navigation.navigate("CinemaList");
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

  // Set Row Price List
  useEffect(() => {
    if (seatRow && seatCol) {
      let tempPrice = {};
      let rowName = String.fromCharCode(65);
      for (let index = 0; index < seatRow; index++) {
        tempPrice[rowName] = "";
        rowName = String.fromCharCode(rowName.charCodeAt(0) + 1);
      }
      setSeatPrice(tempPrice);
    }
  }, [seatRow, seatCol]);

  // Render Seating and Price Input
  const RenderSeating = () => {
    if (!seatRow && !seatCol) {
      return (
        <>
          <Text>Choose Seat Row and Column</Text>
        </>
      );
    }

    let seatingMapView = [];
    let rowNumb = parseInt(seatRow);
    let rowName = String.fromCharCode(64 + rowNumb);

    for (let index = 0; index < seatRow; index++) {
      let seatingRow = [];
      for (let index = 1; index <= seatCol; index++) {
        seatingRow.push(
          <View style={CinemaCreateStyle.seatGridBox} key={index}>
            <View style={CinemaCreateStyle.seatBox}>
              <Text style={CinemaCreateStyle.seatBoxText}>
                {rowName}
                {index}
              </Text>
            </View>
          </View>
        );
      }
      seatingMapView.push(
        <View style={CinemaCreateStyle.seatRow} key={index}>{seatingRow}</View>
      );
      rowName = String.fromCharCode(rowName.charCodeAt(0) - 1);
    }



    let seatingPrice = [];
    Object.keys(seatPrice).forEach((key, index) => {
      // console.log(key, ",", index, ": ", seatPrice[key]);
      seatingPrice.push(
        <View style={CinemaCreateStyle.seatPriceRow} key={index}>
          <View style={CinemaCreateStyle.seatBoxForPrice}>
            <Text style={CinemaCreateStyle.seatBoxTextForPrice}>{key}</Text>
          </View>
          <View style={CinemaCreateStyle.seatPriceInput}>
            <UserTextInput
              placeholder={"Enter Price for Row "+key}
              keyboardType="number-pad"
              // value={seatPrice[index]}
              setValue={(e) => {
                let temp = seatPrice;
                temp[key] = e;
                setSeatPrice(temp);
              }}
            />
          </View>
        </View>
      );
    });

    return (
      <>
        <View style={CinemaCreateStyle.seatingContainer}>
          <Image
            source={require("../../../../../assets/img/projector.png")}
            style={CinemaCreateStyle.projectorImg}
          />
          {seatingMapView}
        </View>
        <Text style={CinemaCreateStyle.titleText}>Seat Price Per Row</Text>
        <View style={CinemaCreateStyle.seatingPriceContainer}>
          {seatingPrice}
        </View>
      </>
    );
  };

  return (
    <>
      <ScrollView>
        <SafeAreaView style={CinemaCreateStyle.container}>
          <View>
            <Text style={CinemaCreateStyle.titleText}>Info</Text>
            <TouchableOpacity onPress={pickImage}>
              {image ? (
                <Image
                  source={image ? { uri: image.uri } : null}
                  style={CinemaCreateStyle.imageStyle}
                />
              ) : (
                <View style={CinemaCreateStyle.imageStyle}>
                  <Text style={CinemaCreateStyle.imageIcon}>Image Upload</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={CinemaCreateStyle.bodyContainer}>
            <UserTextInput
              label="Name"
              placeholder="Enter Cinema Name"
              value={name}
              setValue={setName}
            />
            <UserTextInput
              label="City"
              placeholder="Enter Cinema City Name"
              value={city}
              setValue={setCity}
            />
            <Text style={CinemaCreateStyle.titleText}>Contact</Text>
            <UserTextInput
              label="Phone"
              placeholder="Enter Cinema Phone Number"
              value={phone}
              setValue={setPhone}
              keyboardType="number-pad"
            />
            <UserTextInput
              label="Email"
              placeholder="Enter Cinema Email Address"
              value={email}
              setValue={setEmail}
              keyboardType="email-address"
            />
            <UserTextInput
              label="Address"
              placeholder="Enter Cinema Address"
              value={address}
              setValue={setAddress}
              multiline={true}
              numberOfLines={2}
            />
            <Text style={CinemaCreateStyle.titleText}>Seating</Text>
            <SelectBox
              label="Row"
              value={seatRow - 5}
              list={seatRow_list}
              setValue={(setRowValue) => {
                setSeatRow(seatRow_list[setRowValue]);
              }}
            />
            <SelectBox
              label="Col"
              value={seatCol - 5}
              list={seatCol_list}
              setValue={(setColValue) => {
                setSeatCol(seatCol_list[setColValue]);
              }}
            />
          </View>
          <RenderSeating />
          <View style={CinemaCreateStyle.btnBox}>
            <PrimaryButton title="Create" onPress={uploadCinema} />
            <SecondaryButton title="Cancle" onPress={cancleAction} />
          </View>
        </SafeAreaView>
      </ScrollView>
      <LinearGradient
        colors={[WHITE, "transparent"]}
        style={CinemaCreateStyle.header}
      >
        <View style={CinemaCreateStyle.headerRow}>
          <TouchableOpacity
            style={CinemaCreateStyle.headerBackBtn}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              color={PRIMARY}
              size={36}
            />
          </TouchableOpacity>
          <Text style={CinemaCreateStyle.headerTitle}>Cinema Create</Text>
        </View>
      </LinearGradient>
      {isUploading ? (
        <Modal visible={true} transparent={true} animationType="fade">
          <View style={CinemaCreateStyle.modalContainer}>
            <ActivityIndicator
              size="large"
              color={PRIMARY}
              style={CinemaCreateStyle.modalLoadingCircle}
            />
            <Text style={CinemaCreateStyle.modalText}>Uploading.....</Text>
          </View>
        </Modal>
      ) : null}
    </>
  );
};

export default CinemaCreateScreen;
