import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { PRIMARY, SECONDARY, WHITE } from "../../utils/styles/color";

export const TertiaryButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={TertiaryButtonStyle.buttonStyle}>
      <Text style={TertiaryButtonStyle.buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const TertiaryButtonStyle = StyleSheet.create({
  buttonStyle: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 5,
  },
  buttonTextStyle: {
    fontSize: 18,
    fontWeight: "500",
    color: SECONDARY,
    textAlign: "center",
  },
});
