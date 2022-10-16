import React from "react";
import { ActivityIndicator, StyleSheet, View,StatusBar } from "react-native";
import { PRIMARY } from "../../utils/styles/color";

export const LoadingScreen = () => {
  return (
    <>
      <StatusBar backgroundColor={PRIMARY} />
      <View style={LoadingScreenStyle.container}>
        <ActivityIndicator size="large" color={PRIMARY} />
      </View>
    </>
  );
};

const LoadingScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
