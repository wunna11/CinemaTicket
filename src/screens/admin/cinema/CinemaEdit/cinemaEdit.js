import React, { useState, useEffect } from "react";
import { CinemaEditStyle } from "./cinemaEdit.style";
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

const CinemaEditScreen = ({ route, navigation }) => {
  // Route Params
  const { cinema } = route.params;

  // FireBase
  const cinemaDataRef = firebase.firestore().collection("cinemas");

  // Input Data
  const [image, setImage] = useState({ uri: cinema.image });
  const [imageUpd, setImageUpd] = useState(null);
  const [name, setName] = useState(cinema.name);
  const [city, setCity] = useState(cinema.city);
  const [phone, setPhone] = useState(cinema.phone);
  const [email, setEmail] = useState(cinema.email);
  const [address, setAddress] = useState(cinema.address);
  const prevSeatRow = cinema.seatRow;
  const [seatRow, setSeatRow] = useState(cinema.seatRow);
  const seatRow_list = ["5", "6", "7", "8", "9", "10"];
  const [seatCol, setSeatCol] = useState(cinema.seatCol);
  const seatCol_list = ["5", "6", "7", "8", "9", "10"];
  const [seatPrice, setSeatPrice] = useState(cinema.seatPrice);

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
      setImageUpd(source);
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

  // Upload Movie Data
  const updateCinema = async () => {
    setIsUploading(true);
    const serverTime = firebase.firestore.Timestamp.now().toDate().toString();
    if (name && name.length > 0) {
      // Upload Image to Storage
      var imgUrl;
      if (imageUpd !== null) {
        const response = await fetch(imageUpd.uri);
        const blob = await response.blob();
        const filename = namingFile(serverTime);
        var ref = firebase.storage().ref("cinemas/").child(filename).put(blob);
        try {
          await ref;
        } catch (e) {
          console.log(e);
        }
        imgUrl = await firebase
          .storage()
          .ref(`cinemas/${filename}`)
          .getDownloadURL();

        // Delete Old Image in Storage
        deleteOldImage(image.uri);
      } else {
        // Keep old image link
        imgUrl = image.uri;
      }

      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      // Sending Cinema Data to server
      cinemaDataRef
        .doc(cinema.id)
        .update({
          image: imgUrl,
          name: name,
          city: city,
          seatRow: parseInt(seatRow),
          seatCol: parseInt(seatCol),
          seatPrice: seatPrice,
          phone: phone,
          email: email,
          address: address,
          updatedAt: timestamp,
        })
        .then(() => {
          // setTitle("");
        })
        .then(() => {
          Alert.alert("Cinema Edit", "Cinema is successfully Updated");
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

  const cancleAction = () => {
    navigation.goBack();
  };

  // Set Row Price List
  useEffect(() => {
    if (prevSeatRow != seatRow && seatCol) {
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
          <View style={CinemaEditStyle.seatGridBox} key={index}>
            <View style={CinemaEditStyle.seatBox}>
              <Text style={CinemaEditStyle.seatBoxText}>
                {rowName}
                {index}
              </Text>
            </View>
          </View>
        );
      }
      seatingMapView.push(
        <View style={CinemaEditStyle.seatRow} key={index}>{seatingRow}</View>
      );
      rowName = String.fromCharCode(rowName.charCodeAt(0) - 1);
    }

    let seatingPrice = [];
    Object.keys(seatPrice).forEach((key, index) => {
      seatingPrice.push(
        <View style={CinemaEditStyle.seatPriceRow} key={index}>
          <View style={CinemaEditStyle.seatBoxForPrice}>
            <Text style={CinemaEditStyle.seatBoxTextForPrice}>{key}</Text>
          </View>
          <View style={CinemaEditStyle.seatPriceInput}>
            <UserTextInput
              placeholder={seatPrice[key]}
              keyboardType="number-pad"
              // value={seatPrice[key]}
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
        <View style={CinemaEditStyle.seatingContainer}>
          <Image
            source={require("../../../../../assets/img/projector.png")}
            style={CinemaEditStyle.projectorImg}
          />
          {seatingMapView}
        </View>
        <Text style={CinemaEditStyle.titleText}>Seat Price Per Row</Text>
        <View style={CinemaEditStyle.seatingPriceContainer}>
          {seatingPrice}
        </View>
      </>
    );
  };

  return (
    <>
      <ScrollView>
        <SafeAreaView style={CinemaEditStyle.container}>
          <View>
            <Text style={CinemaEditStyle.titleText}>Info</Text>
            <TouchableOpacity onPress={pickImage}>
              {image ? (
                <Image
                  source={imageUpd ? { uri: imageUpd.uri } : { uri: image.uri }}
                  style={CinemaEditStyle.imageStyle}
                />
              ) : (
                <View style={CinemaEditStyle.imageStyle}>
                  <Text style={CinemaEditStyle.imageIcon}>Image Upload</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={CinemaEditStyle.bodyContainer}>
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
            <Text style={CinemaEditStyle.titleText}>Contact</Text>
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
            <Text style={CinemaEditStyle.titleText}>Seating</Text>
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
          <View style={CinemaEditStyle.btnBox}>
            <PrimaryButton title="Update" onPress={updateCinema} />
            <SecondaryButton title="Cancle" onPress={cancleAction} />
          </View>
        </SafeAreaView>
      </ScrollView>
      <LinearGradient
        colors={[WHITE, "transparent"]}
        style={CinemaEditStyle.header}
      >
        <View style={CinemaEditStyle.headerRow}>
          <TouchableOpacity
            style={CinemaEditStyle.headerBackBtn}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              color={PRIMARY}
              size={36}
            />
          </TouchableOpacity>
          <Text style={CinemaEditStyle.headerTitle}>Cinema Edit</Text>
        </View>
      </LinearGradient>
      {isUploading ? (
        <Modal visible={true} transparent={true} animationType="fade">
          <View style={CinemaEditStyle.modalContainer}>
            <ActivityIndicator
              size="large"
              color={PRIMARY}
              style={CinemaEditStyle.modalLoadingCircle}
            />
            <Text style={CinemaEditStyle.modalText}>Uploading.....</Text>
          </View>
        </Modal>
      ) : null}
    </>
  );
};

export default CinemaEditScreen;
