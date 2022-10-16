import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import CinemaListScreen from "../../screens/admin/cinema/CinemaList/cinemaList";
import CinemaCreateScreen from "../../screens/admin/cinema/CinemaCreate/cinemaCreate";
import CinemaEditScreen from "../../screens/admin/cinema/CinemaEdit/cinemaEdit";
import CinemaDetailScreen from "../../screens/admin/cinema/CinemaDetail/cinemaDetail";

const Stack = createNativeStackNavigator();

export default function CinemaStackNavigator() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
    >
      <Stack.Screen
        name="CinemaList"
        component={CinemaListScreen}
        options={{ title: "Cinema" }}
      />
      <Stack.Screen
        name="CinemaCreate"
        component={CinemaCreateScreen}
        options={{ title: "Cinema Create" }}
      />
      <Stack.Screen
        name="CinemaEdit"
        component={CinemaEditScreen}
        options={{ title: "Cinema Edit" }}
      />
      <Stack.Screen
        name="CinemaDetail"
        component={CinemaDetailScreen}
        options={{ title: "Cinema Detail", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
