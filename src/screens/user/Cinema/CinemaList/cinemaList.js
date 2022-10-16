import React, { useState, useEffect } from "react";
import { CinemaListstyle } from "./cinemaList.style";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  View,
  FlatList,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import { firebase } from "../../../../../config";
import { MaterialIcons } from "@expo/vector-icons";

// Components
import {
  GRAY,
  PRIMARY,
  SECONDARY,
  WHITE,
} from "../../../../utils/styles/color";
import { SecondaryButton } from "../../../../components/Button/SecondaryButton";
import { ScrollView } from "react-native-gesture-handler";
import { limitPagination } from "../../../../utils/styles/color";

//refresh wait
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const CinemaCard = ({ cinema }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("CinemaDetailUser", { cinema: cinema })
      }
    >
      <ImageBackground
        style={CinemaListstyle.containerCard}
        imageStyle={CinemaListstyle.imageStyle}
        source={{ uri: cinema.image }}
      >
        <LinearGradient
          style={CinemaListstyle.gradientBox}
          colors={["rgba(0,0,0,0.5)", "transparent", "rgba(237, 63, 33,0.5)"]}
        >
          <Text style={CinemaListstyle.cinemaName}>
            {cinema.name}{" "}
            <Text style={CinemaListstyle.cinemaCity}>({cinema.city})</Text>
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const CinemaListScreen = ({ cinema }) => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const dataRef = firebase.firestore().collection("cinemas");

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

  //refresh
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getData = () => {
    dataRef.limit(limitPagination).onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const cinema = doc.data();
        cinema.id = doc.id;
        data.push(cinema);
      });
      setData(data);
      setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  //Pagination Infinite data
  const [lastDocument, setLastDocument] = useState();
  const [loading, setLoading] = useState(false);

  const LoadData = () => {
    let query = dataRef; //sort the data
    if (lastDocument !== undefined) {
      query = query.startAfter(lastDocument);
    }
    query
      .limit(1) // limit to your page size,
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const cinema = doc.data();
          cinema.id = doc.id;
          setData([...data, cinema]);
        });
        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
      });
  };

  const renderFooter = () => {
    if (loading) {
      return (
        <View style={CinemaListstyle.footer}>
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        </View>
      );
    } else {
      return (
        <View style={CinemaListstyle.footerComponent}>
          <Text>No more post to show</Text>
        </View>
      );
    }
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View style={CinemaListstyle.line} />
    );
  };

  // FlatList Render Components
  const renderItem = ({ item }) => <CinemaCard cinema={item} />;
  const renderHeader = () => {
    return (
      <View style={CinemaListstyle.Button}>
        <SecondaryButton title={"Search Cineama"} onPress={SearchSomeCinema} />
        <MaterialIcons
          name="search"
          size={30}
          color={"#aaa"}
          style={{ marginLeft: -50, marginTop: 10 }}
        />
      </View>
    );
  };

  const CinemaDetailUSER = (cinema) => {
    navigation.navigate("CinemaDetailUser", { cinema: cinema });
  };

  const SearchSomeCinema = () => {
    navigation.navigate("SearchCinema");
  };
  return (
    <>
      <StatusBar backgroundColor={PRIMARY} />
      <View style={CinemaListstyle.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ItemSeparatorComponent={ItemSeparatorView}
          onEndReached={() => {
            console.log("End");
            LoadData();
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            // onEndReachedCalledDuringMomentun = false;
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </>
  );
};

export default CinemaListScreen;
