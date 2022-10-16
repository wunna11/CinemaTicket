import React from "react";
import { ProfileStyle } from "./profile.style";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { Card, Button } from "@rneui/themed";

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={ProfileStyle.container}>
      <Text >Admin Profile Screen</Text>
      <Button
        title='Booking Ticket'
        onPress={() => navigation.navigate('Booking Ticket')}
      />
    </View>
  );
};

export default ProfileScreen;
