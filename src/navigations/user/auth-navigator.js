import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Navigators
import UserAppNavigator from "./app-navigator";
// Screens
import LoginScreen from "../../screens/user/Login/login";
import Register from "../../screens/user/Register/register";
import EditProfileScreen from "../../screens/user/EditProfile/editProfile";
import MovieDetailScreen from "../../screens/admin/movie/MovieDetail/movieDetail";
import CinemaDetailScreen from "../../screens/admin/cinema/CinemaDetail/cinemaDetail";
import ShowDetailScreen from "../../screens/user/ShowDetail/showDetail";
import AdminAppNavigator from "../admin/app-navigator";
import phone_otp from "../../screens/user/PhoneOTP/phone_otp";
import SearchSomeCinema from "../../screens/user/Search/SearchSome";
import SearchMovie from "../../screens/user/Search/SearchMovie";

const Stack = createNativeStackNavigator();

export default function UserAuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="UserAppNavigator" component={UserAppNavigator} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="PhoneOtp" component={phone_otp} />
      <Stack.Screen name="CinemaDetailUser" component={CinemaDetailScreen} />
      <Stack.Screen name="AdminAppNavigator" component={AdminAppNavigator} />
      <Stack.Screen
        name="MovieDetailOnly"
        component={MovieDetailScreen}
        options={{ title: "Movie Detail", headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetailUser"
        component={ShowDetailScreen}
        options={{ title: "Show" }}
      />
      <Stack.Screen
        name="SearchCinema"
        component={SearchSomeCinema}
        options={{ title: "Search Cinema", headerShown: true }}
      />
      <Stack.Screen
        name="SearchMovie"
        component={SearchMovie}
        options={{ title: "Search Movie", headerShown: true }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerTitle: "Edit Profile",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
