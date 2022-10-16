import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export const InputError = ({ error }) => {
  return (
    <Text style={InputErrorStyle.textStyle}>
      {"* "}
      {error}
    </Text>
  );
};

const InputErrorStyle = StyleSheet.create({
  textStyle: {
    width: "100%",
    color: "#D32F2F",
    marginVertical: 5,
  },
});
