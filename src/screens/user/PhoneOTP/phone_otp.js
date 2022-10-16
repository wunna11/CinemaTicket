import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, TextInput, Alert } from "react-native";
import { firebase } from "../../../../config";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptcha,
  FirebaseRecaptchaVerifier,
} from "expo-firebase-recaptcha";
import { PrimaryButton } from "../../../components/Button/PrimaryButton";
import { SecondaryButton } from "../../../components/Button/SecondaryButton";
import { OptStyle } from "./phoneOTPstyle";

export default phone_otp = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const onPressSendVerificationCode = async () => {
    // Start phone authentication
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then((res) => {
        console.log(res);
        setVerificationId(res);
        applicationVerifier;
      });
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setCode("");
      })
      .catch((error) => {
        console.log(error);
      });
    if (code === "" || code === null) return;
    try {
      navigation.navigate("UserAppNavigator");
    } catch (err) {
      setError(err.message);
    }
    console.log("Login In Successful ");
  };

  useEffect(() => {
    setTimeout(() => {
      setPhoneNumber(phoneNumber);
      confirmCode();
    }, 1000);
  }, []);

  return (
    <View style={OptStyle.container}>
      <Text style={OptStyle.label}> OTP Register </Text>
      <TextInput
        placeholder="Phone Number"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoCapitalize="tel"
        style={OptStyle.textBoxes}
      />

      <SecondaryButton title="Get OTP" onPress={onPressSendVerificationCode} />
      <TextInput
        placeholder="Confirmation Code"
        onChangeText={setCode}
        keyboardType="number-pad"
        style={OptStyle.textBoxes}
      />

      <PrimaryButton title="Send Verification" onPress={confirmCode} />

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
        title="Prove you are human!"
        cancelLabel="Close"
      />
    </View>
  );
};
