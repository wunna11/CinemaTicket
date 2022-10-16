import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Share } from "react-native";
import { Card, Button } from "@rneui/themed";
import { firebase } from '../../../../config';
import styles from "./styles";
import Barcode from '@kichiyaki/react-native-barcode-generator';
import { Dimensions } from "react-native";
import { SECONDARY, windowWidth } from "../../../utils/styles/color";
import { Alert } from "react-native";
import { captureRef } from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import * as Sharing from "expo-sharing";
import ViewShot, { captureScreen } from "react-native-view-shot";
// Print
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import moment from "moment";
import * as MediaLibrary from "expo-media-library";
import { FlatList } from "react-native-gesture-handler";

const TicketDetailScreen = ({ route, navigation }) => {

  const dataRef = firebase.firestore().collection("tickets");

  const [id] = useState(route.params.item.id);
  const [movie_title] = useState(route.params.item.movie_title);
  const [ticketNumber] = useState(route.params.item.ticketNumber);
  const [price] = useState(route.params.item.price);
  const [state] = useState(route.params.item.state);
  const [showtime, setShowtime] = useState(route.params.item.showtime);
  const [createdAt] = useState(route.params.item.createdAt);
  const [seatNumber] = useState(route.params.item.seatNumber);
  const [userid] = useState(route.params.item.userid);
  const [username] = useState(route.params.item.username);
  const [total] = useState(route.params.item.total)
  const [cinemaName] = useState(route.params.item.cinemaName);

  const viewShot = React.useRef();
  const viewShotRef = useRef();


  useEffect(() => {
    console.log('showtime', createdAt)

    console.log('ticket id', id)
  }, [])

  // confirm booking state
  const bookingUpdate = () => {
    dataRef
      .doc(route.params.item.id)
      .update({
        "state": { booking: true },
      })
      .then(() => {
        navigation.goBack();
        Alert.alert('Booking Confirmed Successfully')
      })
      .catch((error) => {
        alert(error.message)
      });
  }

  // const captureAndShareScreenshot = () => {
  //   viewShot.current.capture().then((uri) => {
  //     console.log("do something with ", uri);
  //     Sharing.shareAsync("file://" + uri);
  //   }),
  //     (error) => console.error("Oops, snapshot failed", error);
  // };

  const os = Platform.OS;

  const permissionAlert = () => {
    Alert.alert(
      "Data"
    );
  };

  const saveImageFromView = async () => {
    try {
      const uri = await captureRef(viewShot);
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert("Save as Image");
    } catch (e) {
      console.log(e);
      permissionAlert();
    }
  };

  const capture = useCallback(async () => {
    // android
    if (os === "android") {
      const permission = await MediaLibrary.getPermissionsAsync();
      if (permission.canAskAgain && permission.status !== "granted") {
        const permissionResponse = await MediaLibrary.requestPermissionsAsync();
        if (permissionResponse.status !== "granted") {
          permissionAlert();
        } else {
          await saveImageFromView();
        }
      } else if (permission.status !== "granted") {
        permissionAlert();
      } else {
        await saveImageFromView();
      }
    }
    // iOS
    else {
      await saveImageFromView();
    }
  }, []);



  return (


    <View style={styles.container}>
      <ViewShot
        ref={viewShot}
        options={{ format: "jpg", quality: 1.0 }}
      >

        <View style={styles.card}>
          <View style={styles.mvName}>
            <Text style={styles.title}>Movie: {movie_title}</Text>
          </View>
          <View style={styles.mainCnt}>

            <View style={styles.firstCnt}>
              <Text>UserName</Text>
              <Text style={{ fontWeight: 'bold' }}>{username}</Text>
            </View>

            <View style={styles.firstCnt}>
              <Text>ID</Text>
              <Text style={{ fontWeight: 'bold' }}>{id}</Text>
            </View>
          </View>

          <View style={styles.mainCnt}>

            <View style={styles.firstCnt}>
              <Text>Price</Text>
              <Text style={{ fontWeight: 'bold' }}>{price} MMK</Text>
            </View>

            <View style={styles.firstCnt}>
              <Text>Cinema</Text>
              <Text style={{ fontWeight: 'bold' }}>{cinemaName}</Text>
            </View>
          </View>

          <View style={styles.mainCnt}>

            <View style={styles.firstCnt}>
              <Text>Seat Number</Text>
              <Text style={{ fontWeight: 'bold' }}>
                {seatNumber}
              </Text>
            </View>

            <View style={styles.firstCnt}>
              <Text>Created At</Text>
              <Text style={{ fontWeight: 'bold' }}>{moment({ createdAt }).format('MMM Do YY')}</Text>
            </View>
          </View>

          <View style={[styles.mainCnt, { justifyContent: 'center', alignItems: 'center' }]}>

            <Barcode
              format="CODE128"
              value={id}
              text={id}
              style={{ marginBottom: 40 }}
              maxWidth={windowWidth / 2}
            />
          </View>


        </View>

      </ViewShot>

      <View style={[styles.btn, { flexDirection: 'row' }]}>
        <Button
          title="Back"
          onPress={() => navigation.navigate('Ticket List')}
          color='#ed3f21'
        />
        {
          state.booking === true ? (
            null
          ) : (
            <View style={{ marginLeft: 20 }}>
              <Button
                title="Confirm"
                color="green"
                onPress={bookingUpdate}
              />
            </View>
          )
        }


        <View style={{ marginLeft: 20 }}>
          <Button
            title="Download"
            color="#383838"
            // onPress={captureAndShareScreenshot}
            onPress={capture}
          />
        </View>

      </View>
    </View>
  )
}

export default TicketDetailScreen;
