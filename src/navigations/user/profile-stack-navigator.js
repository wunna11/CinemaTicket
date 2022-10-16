import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import ProfileScreen from "../../screens/user/Profile/profile";
import EditProfileScreen from "../../screens/user/EditProfile/editProfile";
import BookingListScreen from "../../screens/user/BookingListScreen";

const Stack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator
    // screenOptions={{
    //   headerShown: false
    // }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
      <Stack.Screen
        name="BookingList"
        component={BookingListScreen}
        options={{ title: "Bookings" }}
      />
    </Stack.Navigator>
  );
}
