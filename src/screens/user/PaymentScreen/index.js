import React from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";

const PaymentScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text >PaymentScreen</Text>
        </View>
    );
};

export default PaymentScreen;