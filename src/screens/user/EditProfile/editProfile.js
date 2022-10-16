import React, { useEffect, useState } from "react";
import { EditProfileStyle } from "./editProfile.style";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Text, View, Image, TextInput, Alert } from "react-native";
import { firebase } from "../../../../config";
import { CommonActions } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BackHandler } from "react-native";
import { async } from "@firebase/util";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Components
import { UserTextInput } from "../../../components/Input/UserTextInput";
import { InputError } from "../../../components/Input/InputError";
import { PrimaryButton } from "../../../components/Button/PrimaryButton";
import { SecondaryButton } from "../../../components/Button/SecondaryButton";
import { SafeAreaView } from "react-native";

const EditProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  //const [phone, setphone] = useState(route.params.user?.phone);
  const [username, setUserName] = useState(route.params.user?.username);
  const [email, setEmail] = useState(route.params.user?.email);
  const [newPassword, setnewPassword] = useState("");
  const [user, setUser] = useState(route.params.user);
  const isFocused = useIsFocused();

  const Cancle = () => {
    navigation.goBack();
  };

  useEffect(() => {}, [isFocused]);

  const UserInfoUpdate = async () => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      id: user.id,
      username: username,
      //phone: phone,
      updatedAt: timestamp,
    };
    const userRef = firebase.firestore().collection("users").doc(user.id);
    userRef.update(data);

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Profile" }],
      })
    );
    Alert.alert("Profile updated Successfully!");
  };

  const UpdatePassword = () => {
    const user = firebase.auth().currentUser;
    user
      .updatePassword(newPassword)
      .then(() => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
          newPassword: newPassword,
          updatedAt: timestamp,
        };
        const userRef = firebase.firestore().collection("users").doc(user.id);
        userRef.set(data);
        alert("Password Changed Successfully! Please Login Again...");
      })
      .catch((error) => {
        alert(error.message);
      });
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

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={EditProfileStyle.container}>
          <View style={EditProfileStyle.formContainer}>
            <Image
              source={require("../../../../assets/avatar.png")}
              style={EditProfileStyle.avatarImage}
            />
            <UserTextInput
              label="User Name"
              placeholder="Enter Your Name"
              value={username}
              setValue={(text) => setUserName(text)}
            />
            <UserTextInput
              label="Email"
              placeholder="Enter Your Email Address"
              keyboardType="email-address"
              value={email}
              setValue={(text) => setEmail(text)}
            />
            <View style={EditProfileStyle.btnBox}>
              <PrimaryButton title={"Save Changes"} onPress={UserInfoUpdate} />
              <SecondaryButton title={"Cancel"} onPress={Cancle} />
            </View>
          </View>
          <View style={EditProfileStyle.formContainer}>
            <Text style={EditProfileStyle.titleText}>Change Password</Text>
            <UserTextInput
              label="New Password"
              placeholder="Enter Your New Password"
              secureTextEntry={true}
              value={newPassword}
              setValue={(text) => setnewPassword(text)}
            />
            <View style={EditProfileStyle.btnBox}>
              <PrimaryButton
                title={"Update Password"}
                onPress={UpdatePassword}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
