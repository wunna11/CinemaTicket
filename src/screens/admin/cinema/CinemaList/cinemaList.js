import React, { useState, useEffect } from "react";
import { CinemaListstyle } from "./cinemaList.style";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, SafeAreaView, StatusBar, Text, View } from "react-native";
import { firebase } from "../../../../../config";

// Components
import { PRIMARY, SECONDARY, WHITE } from "../../../../utils/styles/color";
import { PrimaryButton } from "../../../../components/Button/PrimaryButton";
import { CinemaCard } from "../../../../components/Card/CinemaCard";
import { EndResult } from "../../../../components/Scoll/EndResult";

const CinemaListScreen = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const dataRef = firebase.firestore().collection("cinemas");

  const getData = () => {
    dataRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
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

  // FlatList Render Components
  const renderItem = ({ item }) => <CinemaCard cinema={item} />;
  const renderHeader = () => {
    return <View style={CinemaListstyle.headerComponent}></View>;
  };
  const renderFooter = () => {
    if (data[0] != null) {
      return (
        <View style={CinemaListstyle.footerComponent}>
          <EndResult/>
        </View>
      );
    } else {
      return (
        <View style={CinemaListstyle.footerComponent}>
          <Text>No post to show</Text>
        </View>
      );
    }
  };

  return (
    <>
      <StatusBar backgroundColor={PRIMARY} />
      <SafeAreaView style={CinemaListstyle.mainContainer}>
      <View style={CinemaListstyle.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          // keyExtractor={(_,i) => String(i)}
          enableEmptySections={true}
          onEndReached={() => {}}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
        />
      </View>
      <LinearGradient
        style={CinemaListstyle.header}
        colors={[WHITE, "transparent"]}
      >
        <View style={CinemaListstyle.headerRow}>
          <Text style={CinemaListstyle.headerTitle}>Cinema</Text>
          <View style={CinemaListstyle.headerBtn}>
            <PrimaryButton
              title="Create"
              onPress={() => navigation.navigate("CinemaCreate")}
            />
          </View>
        </View>
      </LinearGradient>
      </SafeAreaView>
    </>
  );
};

export default CinemaListScreen;
