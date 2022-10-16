import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { PRIMARY, SECONDARY, WHITE } from "../../utils/styles/color";

export const SecondaryButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={SecondaryButtonStyle.buttonStyle}
    >
      <Text style={SecondaryButtonStyle.buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const SecondaryButtonStyle = StyleSheet.create({
  buttonStyle: {
    borderRadius: 8,
    width: "100%",
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    marginVertical: 5,
    borderColor: SECONDARY,
    borderWidth: 2,
  },
  buttonTextStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: SECONDARY,
    textAlign: "center",
  },
});
