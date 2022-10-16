import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Navigators
import AdminAppNavigator from "./app-navigator";
// Screens
import LoginScreen from "../../screens/admin/Login/login";

const Stack = createNativeStackNavigator();

export default function AdminAuthNavigator() {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        <Stack.Screen name="AdminAppNavigator" component={AdminAppNavigator} />
      </Stack.Navigator>
  );
}
