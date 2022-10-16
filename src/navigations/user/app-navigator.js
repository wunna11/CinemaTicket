import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PRIMARY, GRAY, WHITE, BLACK } from "../../utils/styles/color";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Screens
import MovieListScreen from "../../screens/user/MovieList/movieList";
import BookingTicketScreen from "../../screens/user/BookingTicketScreen";
import BookingListScreen from "../../screens/user/BookingListScreen";
import CinemaListScreen from "../../screens/admin/cinema/CinemaList/cinemaList";
import BookingDetailScreen from "../../screens/user/BookingDetailScreen";
//
// import { ImageBackground } from 'react-native-web';
import ProfileStackNavigator from "./profile-stack-navigator";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function UserAppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveBackgroundColor: PRIMARY,
        tabBarInactiveBackgroundColor: WHITE,
        tabBarActiveTintColor: WHITE,
        tabBarInactiveTintColor: PRIMARY,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Movies"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="movie" color={color} size={size} />
          ),
        }}
      >
        {() => (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Movie" component={MovieListScreen} />
            <Stack.Screen
              name="Booking Ticket"
              component={BookingTicketScreen}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Cinema"
        component={CinemaListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="theater" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />

      {() => {
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen
            name="Booking Detail"
            component={BookingDetailScreen}
            options={{ title: 'Booking Detail' }}
          />
        </Stack.Navigator>
      }}
    </Tab.Navigator>
  );
}
