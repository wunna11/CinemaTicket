import React from "react";
import { StyleSheet, TouchableOpacity,Text } from "react-native";
import { PRIMARY, WHITE } from "../../utils/styles/color";

export const PrimaryButton = ({title, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={PrimaryButtonStyle.buttonStyle}>
            <Text style={PrimaryButtonStyle.buttonTextStyle}>{title}</Text>
        </TouchableOpacity>
    );
};

const PrimaryButtonStyle = StyleSheet.create({
    buttonStyle: {
        borderRadius: 8,
        width: "100%",
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: PRIMARY,
        marginVertical: 5,
    },
    buttonTextStyle: {
        fontSize: 18,
        fontWeight: '500',
        color: WHITE,
        textAlign: "center",
    },
});
