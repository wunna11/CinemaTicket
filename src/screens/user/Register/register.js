import React, { useState, useEffect } from "react";
import { SafeAreaView, Image, Text, View } from "react-native";
import { firebase } from "../../../../config";
import { RegisterStyle } from "./register.style";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Component
import { PrimaryButton } from "../../../components/Button/PrimaryButton";
import { TertiaryButton } from "../../../components/Button/TertiaryButton";
import { SecondaryButton } from "../../../components/Button/SecondaryButton";
import { InputError } from "../../../components/Input/InputError";
import { UserTextInput } from "../../../components/Input/UserTextInput";
import { setUserDataAsync } from "expo-facebook";

export default function Register({ navigation }) {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setphone] = useState("");
  const [phoneError, setphoneError] = useState("");
  const [usernameError, setusernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpasswordError, setconfirmPasswordError] = useState("");

  const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

  const backToLoginPress = () => {
    navigation.navigate("Login");
  };

  const createAccountPress = () => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    var nameValid = false;
    if (username.length == 0) {
      setusernameError("Enter Full Name");
    } else {
      setusernameError("");
      nameValid = true;
    }
    //Email Validation
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
    //phone validation
    var phoneValid = false;
    if (phone.length == 0) {
      setphoneError("Enter a phone number.");
    } else if (phone.length < 14) {
      setphoneError("Enter Valid phone , start with +95");
    } else {
      setphoneError("");
      phoneValid = true;
    }
    //Password Validation
    var passwordValid = false;
    if (password.length == 0) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password should be minimum 6 characters");
    } else if (password.indexOf(" ") >= 0) {
      setPasswordError("Password cannot contain spaces");
    } else {
      setPasswordError("");
      passwordValid = true;
    }

    //Confirm Password Validation
    var confirmPasswordValid = false;
    if (confirmPassword.length == 0) {
      setconfirmPasswordError("Enter Password Confirmation");
    } else if (confirmPassword !== password) {
      setconfirmPasswordError(
        "Password and Confrim password must be the same!"
      );
    } else {
      console.log("error pass");
      setconfirmPasswordError("");
      confirmPasswordValid = true;

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          const uid = response.user.uid;
          const data = {
            id: uid,
            email,
            role: "User",
            //phone,
            username,
            createdAt: timestamp,
          };
          const usersRef = firebase.firestore().collection("users");
          usersRef
            .doc(uid)
            .set(data)
            .then(() => {
              navigation.navigate("PhoneOtp");
            })
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          alert("Email is already used");
        });
    }
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      function handleBackButtonClick() {
        navigation.navigate("Login");
        return true;
      }
    });
  }, [navigation]);

  return (
    <SafeAreaView style={RegisterStyle.mainContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={RegisterStyle.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={RegisterStyle.logoBox}>
          <Image
            source={require("../../../../assets/logo.png")}
            style={RegisterStyle.logoImage}
          />
          <Text style={RegisterStyle.logoText}>Cinema Ticket</Text>
        </View>
        <View style={RegisterStyle.formContainer}>
          <Text style={RegisterStyle.titleText}>Register</Text>
          <View>
            <UserTextInput
              label="User Name"
              placeholder="Enter Your Name"
              value={username}
              setValue={(text) => setName(text)}
            />
            {usernameError.length > 0 && <InputError error={usernameError} />}
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
            <UserTextInput
              label="Confirm Password"
              placeholder="Type Your Password Again"
              secureTextEntry={true}
              value={confirmPassword}
              setValue={(text) => setConfirmPassword(text)}
            />
            {confirmpasswordError.length > 0 && (
              <InputError error={confirmpasswordError} />
            )}
          </View>
          <View style={RegisterStyle.btnBox}>
            <PrimaryButton
              title="Create Account"
              onPress={createAccountPress}
            />
            {/* <SecondaryButton
              title="OTP"
              onPress={() => navigation.navigate("PhoneOtp")}
            /> */}
          </View>
        </View>
        <TertiaryButton title="Login" onPress={backToLoginPress} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
