import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { firebase } from "../../../../config";
import { SearchBar } from "react-native-elements";
import { SearchSomeStyle } from "./SearchSimeStyle";

export default function SearchMovie() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const dataRef = firebase.firestore().collection("movies");

  const getData = () => {
    dataRef.onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const movie = doc.data();
        movie.id = doc.id;
        data.push(movie);
      });
      setData(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  //search bar
  const [search, setSearch] = useState("");
  const [filterMovie, setFilterMovie] = useState([]);

  useEffect(() => {
    setFilterMovie(
      data.filter(
        (res) =>
          res.title.toLowerCase().includes(search.toLowerCase()) ||
          res.category.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  const MovieDetailUSER = (movie) => {
    // var showBtn = false;
    navigation.navigate("MovieDetailOnly", { movie: movie });
  };

  const SearchMovie = () => {
    navigation.navigate("SearchMovie");
  };

  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          <SearchBar
            placeholder="Search Movie"
            onChangeText={(search) => setSearch(search)}
            value={search}
          />

          {search.length ? (
            <Text>
              {filterMovie.map((item, index) => (
                <View key={index} style={SearchSomeStyle.searchSyl}>
                  <TouchableOpacity
                    onPress={() => {
                      MovieDetailUSER(item);
                    }}
                  >
                    <View style={SearchSomeStyle.row}>
                      <Image
                        style={SearchSomeStyle.iimageMovie}
                        source={{ uri: item.imagePoster }}
                      />
                      <View style={SearchSomeStyle.column}>
                        <Text style={SearchSomeStyle.label}>
                          {" "}
                          Title: {item.title.substr(0, 100)},
                        </Text>
                        <Text style={SearchSomeStyle.label}>
                          {" "}
                          {item.category.substr(0, 30)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </Text>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
