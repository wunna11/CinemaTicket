import React, { useState, useEffect } from "react";
import { firebase } from "../../../../config";
import { LoginStyle } from "./login.style";
import { useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Facebook from "expo-facebook";

//import { getAuth, FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
// Component
import { UserTextInput } from "../../../components/Input/UserTextInput";
import { PrimaryButton } from "../../../components/Button/PrimaryButton";
import { TertiaryButton } from "../../../components/Button/TertiaryButton";
import { InputError } from "../../../components/Input/InputError";
import { ActivityIndicator } from "react-native-web";
import { SafeAreaView } from "react-native";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [isLoggedin, setloggedInStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isImageLoading, setImageLoadStatus] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

  const register = () => {
    navigation.navigate("Register");
  };

  const InstantLoginCinema = () => {
    navigation.navigate("UserAppNavigator");
  };

  const LoginCinema = () => {
    var emailValid = false;

    if (email.length == 0) {
      setEmailError("Email is required");
    } else if (email.length < 6) {
      setEmailError("Email should be minimum 6 characters");
    } else if (email.indexOf(" ") >= 0) {
      setEmailError("Email cannot contain spaces");
    } else if (!emailPattern.test(email) && email.length > 0) {
      setEmailError("Enter a valid email!");
    } else {
      setEmailError("");
      emailValid = true;
    }
    var passwordValid = false;
    if (password.length == 0) {
      setPasswordError("Password is required!");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          const uid = response.user.uid;
          const usersRef = firebase.firestore().collection("users");
          usersRef
            .doc(uid)
            .get()
            .then((firestoreDocument) => {
              if (!firestoreDocument.exists) {
                setPasswordError("User does not exit anymore");
                return;
              } else {
                //Split UserView
                const userrole = firestoreDocument.data()?.role;
                if (userrole == "Admin") {
                  navigation.navigate("AdminAuthNavigator");
                } else navigation.navigate("UserAppNavigator");
              }
            });
        })
        .catch((error) => {
          console.log(error);
          setPasswordError("Email or Password is wrong!Try Again...");
        });
      setPasswordError("");
      passwordValid = true;
    }
  };

  // const facebookLogin = async () => {
  //   try {
  //     await Facebook.initializeAsync({
  //       appId: "789868638736765",
  //     });
  //     const { type, token } = await Facebook.logInWithReadPermissionsAsync({
  //       permissions: ["public_profile"],
  //     });
  //     if (type === "success") {
  //       fetch(
  //         "http://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)"
  //       )
  //         .then((response) => response.json())
  //         .then((data) => {
  //           setloggedInStatus(true);
  //           setUserData(true);
  //         })
  //         .catch((e) => console.log(e));
  //     } else {
  //       // type === 'cancel'
  //     }
  //   } catch ({ message }) {
  //     alert("Facebook Login Error: " + message);
  //   }
  // };

  const logout = () => {
    setloggedInStatus(false);
    setUserData(null);
    setImageLoadStatus(false);
  };

  return (
    <SafeAreaView style={LoginStyle.mainContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={LoginStyle.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={LoginStyle.logoBox}>
          <Image
            source={require("../../../../assets/logo.png")}
            style={LoginStyle.logoImage}
          />
          <Text style={LoginStyle.logoText}>Cinema Ticket</Text>
        </View>
        <View style={LoginStyle.formContainer}>
          <Text style={LoginStyle.titleText}>Login</Text>
          <View>
            <UserTextInput
              label="Email"
              placeholder="Enter Your Email Address"
              keyboardType="email-address"
              value={email}
              setValue={(text) => setEmail(text)}
            />
            {emailError.length > 0 && <InputError error={emailError} />}
            <UserTextInput
              label="Password"
              placeholder="Enter Your Password"
              secureTextEntry={true}
              value={password}
              setValue={(text) => setPassword(text)}
            />
            {passwordError.length > 0 && <InputError error={passwordError} />}
          </View>
          <View style={LoginStyle.btnBox}>
            <PrimaryButton title="Login" onPress={LoginCinema} />
            {/* After  Test Mode >> delete this */}
            {/* <PrimaryButton title="Instant Login " onPress={InstantLoginCinema} /> */}
          </View>
        </View>
        <TertiaryButton title="Sign Up" onPress={register} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
