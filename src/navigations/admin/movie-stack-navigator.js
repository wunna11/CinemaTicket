import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import MovieListScreen from "../../screens/admin/movie/MovieList/movieList";
import MovieCreateScreen from "../../screens/admin/movie/MovieCreate/movieCreate";
import MovieEditScreen from "../../screens/admin/movie/MovieEdit/movieEdit";
import MovieDetailScreen from "../../screens/admin/movie/MovieDetail/movieDetail";
import ShowDetailScreen from "../../screens/admin/movie/ShowDetail/showDetail";

const Stack = createNativeStackNavigator();

export default function MovieStackNavigator() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
    >
      <Stack.Screen
        name="MovieList"
        component={MovieListScreen}
        options={{ title: "Movies" }}
      />
      <Stack.Screen
        name="MovieCreate"
        component={MovieCreateScreen}
        options={{ title: "Movie Create" }}
      />
      <Stack.Screen
        name="MovieEdit"
        component={MovieEditScreen}
        options={{ title: "Movie Edit" }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={{ title: "Movie Detail", headerShown: false }}
      />
      <Stack.Screen
        name="ShowDetail"
        component={ShowDetailScreen}
        options={{ title: "Show" }}
      />
    </Stack.Navigator>
  );
}
