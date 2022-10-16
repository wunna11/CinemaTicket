import React from "react";
import { Text,View ,StyleSheet} from "react-native";
import { PRIMARY, SECONDARY } from "../../utils/styles/color";
import IonIcon from "react-native-vector-icons/Ionicons"

export const EndResult = () => {
    return (
        <View style={EndResultStyle.container}>
            <IonIcon name="checkmark-done-circle-outline" size={50} color={PRIMARY} />
            <Text style={EndResultStyle.text}>End of Result</Text>
        </View>
    )
}

const EndResultStyle = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    text: {
        color: SECONDARY
    }
})