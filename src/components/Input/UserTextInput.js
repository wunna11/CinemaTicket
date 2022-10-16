import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { BLACK, GRAY, GRAY100, GRAY200, GRAY300, GRAY400, PRIMARY, WHITE } from "../../utils/styles/color";

export const UserTextInput = ({
  value,
  setValue,
  label,
  placeholder,
  secureTextEntry,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
}) => {

  const [isFocus,setIsFocus] = useState(false);

  return (
    <View style={UserTextInputStyle.containerStyle}>
      {label && <Text style={UserTextInputStyle.labelStyle}>{label}</Text>}
      <View style={ isFocus ? [UserTextInputStyle.inputBoxStyle,UserTextInputStyle.inputBoxFocusStyle] : UserTextInputStyle.inputBoxStyle }>
        <TextInput
          placeholder={placeholder}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholderTextColor="#aaaaaa"
          cursorColor ={PRIMARY}
          onChangeText={setValue}
          value={value}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={UserTextInputStyle.inputBoxTextStyle}
        />
      </View>
    </View>
  );
};

const UserTextInputStyle = StyleSheet.create({
  containerStyle: {
    width: "100%",
    marginVertical: 5,
  },
  labelStyle: {
    color: GRAY400,
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 5,
    marginBottom: 2,
  },
  inputBoxStyle: {
    backgroundColor: WHITE,
    width: "100%",
    flexDirection: "row",
    borderColor: GRAY300,
    borderWidth: 1,
    borderRadius:8 ,
    padding: 8,
  },
  inputBoxFocusStyle: {
    borderWidth: 2,
    borderColor: PRIMARY,
  },
  inputBoxTextStyle: {
    width: "100%",
    // color: BLACK,
    fontSize: 16,
    textAlignVertical: "top",
  },
});
