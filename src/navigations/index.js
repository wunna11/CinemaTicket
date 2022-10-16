import react from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Navigators
import AdminAuthNavigator from "./admin/auth-navigator";
import UserAuthNavigator from "./user/auth-navigator";
// Screens
import BookingDetailScreen from "../screens/user/BookingDetailScreen";

const Stack = createNativeStackNavigator();

export default function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserAuthNavigator" component={UserAuthNavigator} />
        <Stack.Screen
          name="AdminAuthNavigator"
          component={AdminAuthNavigator}
        />
        <Stack.Screen name="Booking Detail" component={BookingDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
