import React, { useState } from "react";
import { RegisterStyle } from "./register.style";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Components
import { PrimaryButton } from "../../../components/Button/PrimaryButton";
import { SecondaryButton } from "../../../components/Button/SecondaryButton";
import { UserTextInput } from "../../../components/Input/UserTextInput";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    // if (password !== confirmPassword) {
    //     alert("Passwords don't match.")
    //     return
    // }
    // firebase
    //     .auth()
    //     .createUserWithEmailAndPassword(email, password)
    //     .then((response) => {
    //         const uid = response.user.uid
    //         const data = {
    //             id: uid,
    //             email,
    //             fullName,
    //         };
    //         const usersRef = firebase.firestore().collection('users')
    //         usersRef
    //             .doc(uid)
    //             .set(data)
    //             .then(() => {
    //                 navigation.navigate('Home', {user: data})
    //             })
    //             .catch((error) => {
    //                 alert(error)
    //             });
    //     })
    //     .catch((error) => {
    //         alert(error)
    // });
  };

  return (
    <View style={RegisterStyle.container}>
      <KeyboardAwareScrollView
        // style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Text>Admin RegisterScreen</Text>
        <View style={RegisterStyle.btnBox}>
          <UserTextInput
            label="Name"
            placeholder="Enter Your Full Name"
            value={fullName}
            setValue={setFullName}
          />
          <UserTextInput
            label="Email"
            placeholder="Enter Your Email Address"
            value={email}
            setValue={setEmail}
            keyboardType="email-address"
          />
          <UserTextInput
            label="Password"
            placeholder="Enter Your Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <UserTextInput
            label="Confirm Password"
            placeholder="Confirm Your Password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            secureTextEntry={true}
          />
          <PrimaryButton
            title="Register"
            onPress={() => onRegisterPress()}
            // onPress={() => navigation.navigate("AdminAppNavigator")}
          />
          <SecondaryButton title="Login" onPress={() => onFooterLinkPress()} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RegisterScreen;
