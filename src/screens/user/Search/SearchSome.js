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
import { SearchSomeStyle } from "./SearchSimeStyle";
import { SearchBar } from "react-native-elements";

export default function SearchSomeCinema() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const dataRef = firebase.firestore().collection("cinemas");

  const getData = () => {
    dataRef.onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const cinema = doc.data();
        cinema.id = doc.id;
        data.push(cinema);
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
          res.name.toLowerCase().includes(search.toLowerCase()) ||
          res.city.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  const CinemaDetailUSER = (cinema) => {
    // var showBtn = false;
    navigation.navigate("CinemaDetailUser", { cinema: cinema });
  };

  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          <SearchBar
            placeholder="Search Cinema"
            onChangeText={(search) => setSearch(search)}
            value={search}
          />
          {search.length ? (
            <Text>
              {filterMovie.map((item, index) => (
                <View key={index} style={SearchSomeStyle.searchSyl}>
                  <TouchableOpacity
                    onPress={() => {
                      CinemaDetailUSER(item);
                    }}
                  >
                    <View style={SearchSomeStyle.row}>
                      <Image
                        style={SearchSomeStyle.iimage1}
                        source={{ uri: item.image }}
                      />
                      <View style={SearchSomeStyle.column}>
                        <Text style={SearchSomeStyle.label}>
                          {" "}
                          {item.name.substr(0, 10)} ,
                        </Text>
                        <Text style={SearchSomeStyle.label}>
                          {" "}
                          {item.city.substr(0, 10)} Township
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
