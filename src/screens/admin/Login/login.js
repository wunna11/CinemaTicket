import React, { useState } from "react";
import { LoginStyle } from "./login.style";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { PrimaryButton } from "../../../components/Button/PrimaryButton";
import { SecondaryButton } from "../../../components/Button/SecondaryButton";
import { UserTextInput } from "../../../components/Input/UserTextInput";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Register");
  };

  const onLoginPress = () => {};

  return (
    <View style={LoginStyle.container}>
      <KeyboardAwareScrollView
        // style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Text>Admin LoginScreen</Text>
        <View style={LoginStyle.btnBox}>
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
          <PrimaryButton
            title="Login"
            onPress={() => onLoginPress()}
            // onPress={() => navigation.navigate("AdminAppNavigator")}
          />
          <SecondaryButton title="Register" onPress={() => onFooterLinkPress()} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginScreen;
