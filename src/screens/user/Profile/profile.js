import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../../../../config";
import { CommonActions } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProfileStyle } from "./profile.style";

// Components
import { PRIMARY, SECONDARY, WHITE } from "../../../utils/styles/color";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const auth = firebase.auth;
  const [user, setUser] = useState(null);

  const Edit = () => {
    navigation.navigate("EditProfile", { user });
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .get()
      .then((user) => {
        setUser(user.data());
      });
  }, []);

  const signOut = () => {
    firebase.auth().signOut();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      function handleBackClickButton() {
        navigation.goBack();
        return true;
      }
      BackHandler.addEventListener("hardwareBackPress", handleBackClickButton);
      return () => {
        BackHandler.removeEventListener(
          "hardwareBackPress",
          handleBackClickButton
        );
      };
    });
  }, [navigation]);

  const RenderListButton = ({ title, icon, onPress }) => {
    return (
      <TouchableOpacity style={ProfileStyle.listBox} onPress={onPress}>
        <View style={ProfileStyle.listBoxLeft}>
          <MaterialCommunityIcons name={icon} size={36} color={PRIMARY} />
          <Text style={ProfileStyle.listBoxText}>{title}</Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={36}
          color={SECONDARY}
          style={ProfileStyle.listBoxChevron}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={PRIMARY} />
      <SafeAreaView style={ProfileStyle.container}>
        <View style={ProfileStyle.headerComponent}>
          <Text style={ProfileStyle.headerTitle}>Profile</Text>
          <View style={ProfileStyle.userInfoContainer}>
            <Image
              source={require("../../../../assets/avatar.png")}
              style={ProfileStyle.avaterImage}
            />
            <Text style={ProfileStyle.userNameText}>{user?.username}</Text>
          </View>
        </View>

        <View style={ProfileStyle.listContainer}>
          <RenderListButton
            title="Edit Profile"
            icon="account-edit"
            onPress={Edit}
          />
          <RenderListButton
            title="My Ticket"
            icon="ticket-confirmation"
            onPress={() => navigation.navigate("BookingList")}
          />
          <RenderListButton title="Setting" icon="cog" onPress={() => {}} />
          <RenderListButton title="Logout" icon="logout" onPress={() => {}} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProfileScreen;
