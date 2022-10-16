import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { ButtonGroup } from "@rneui/base";
import { GRAY, PRIMARY } from "../../utils/styles/color";

export const SelectBox = ({ list, value, setValue, label }) => {
  return (
    <View style={SelectBoxStyle.container}>
      <Text style={SelectBoxStyle.label}>{label}</Text>
      <ButtonGroup
        containerStyle={{
          borderRadius: 5,
        }}
        innerBorderStyle={{
          color: null,
        }}
        selectedButtonStyle={{
          backgroundColor: PRIMARY,
        }}
        buttons={list}
        onPress={(selectedSeat) => setValue(selectedSeat)}
        selectedIndex={value}
      />
    </View>
  );
};

const SelectBoxStyle = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 5,
  },
  label: {
    color: GRAY,
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 5,
    marginBottom: 3,
  },
});
