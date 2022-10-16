import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GRAY100, PRIMARY, SECONDARY, WHITE } from "../../utils/styles/color";

// Navigator
import MovieStackNavigator from "./movie-stack-navigator";
import CinemaStackNavigator from "./cinema-stack-navigator";
// Screens
import ProfileScreen from "../../screens/admin/Profile/profile";

import TicketListScreen from "../../screens/admin/TicketListScreen";
import TicketCreateScreen from "../../screens/admin/TicketCreateScreen";
import TicketEditScreen from "../../screens/admin/TicketEditScreen";
import TicketDetailScreen from "../../screens/admin/TicketDetailScreen";

import { Entypo } from "@expo/vector-icons";
import { View, Button } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AdminAppNavigator({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: WHITE,
        tabBarInactiveTintColor: PRIMARY,
        tabBarActiveBackgroundColor: PRIMARY,
      }}
    >
      <Tab.Screen
        name="MovieStack"
        component={MovieStackNavigator}
        options={{
          title: "Movie",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="movie" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cinema"
        component={CinemaStackNavigator}
        options={{
          title: "Cinema",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="theater" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TicketList"
        options={{
          title: "Ticket",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="ticket" color={color} size={size} />
          ),
        }}
      >
        {() => (
          <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen
              name="Ticket List"
              component={TicketListScreen}
              options={{
                title: "Ticket List",
                headerTintColor: "#ed3f21",
                headerRight: () => (
                  <View>
                    <Button
                      title="Create"
                      onPress={() => navigation.navigate("Ticket Create")}
                    />
                  </View>
                ),
              }}
            />
            <Stack.Screen name="Ticket Create" component={TicketCreateScreen} />
            <Stack.Screen name="Ticket Edit" component={TicketEditScreen} />
            <Stack.Screen name="Ticket Detail" component={TicketDetailScreen} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
