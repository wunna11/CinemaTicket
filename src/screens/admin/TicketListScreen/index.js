import React, { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, Input, FlatList, ScrollView, SafeAreaView, Dimensions, Image } from "react-native";
import { firebase } from "../../../../config";
import { Card, Button } from "@rneui/themed";
import styles from "./styles";
import { PRIMARY, SECONDARY } from "../../../utils/styles/color";
import Barcode from '@kichiyaki/react-native-barcode-generator';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from "moment";

const TicketListScreen = ({ navigation }) => {

    const [data, setData] = useState([]);
    const dataRef = firebase.firestore().collection('tickets');
    const [search, setSearch] = useState("");
    const [filterTicket, setFilterTicket] = useState([]);

    const [showBox, setShowBox] = useState(true);

    useEffect(() => {
        read();

        setFilterTicket(
            data.filter(
                (res) =>
                    res.movie_title.toLowerCase().includes(search.toLowerCase()) ||
                    // res.username.toLowerCase().includes(search.toLowerCase()) ||
                    res.imagePoster.toLowerCase().includes(search.toLowerCase())
            )
        )
    }, [search, data]);

    const read = async () => {
        dataRef
            .onSnapshot((querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    let objData = doc.data();
                    objData.id = doc.id;
                    data.push(objData)
                });
                setData(data);
            });
    }


    // delete ticket

    const showConfirmDialog = (data) => {
        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to remove this product?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        //console.log("User pressed Later")
                        dataRef.doc(data.id).delete()
                            .then(() => {
                                alert("Deleted Successfully!");
                                console.log("Data Deleted");
                            })
                            .catch((error) => {
                                alert("error");
                            });
                        setShowBox(false);
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    };


    return (

        <SafeAreaView style={styles.container}>

            <View>
                <SearchBar
                    placeholder="Search"
                    placeholderTextColor='#ed3f21'
                    onChangeText={(search) => setSearch(search)}
                    value={search}
                    lightTheme={true}
                />

                {
                    search.length ? (
                        <KeyboardAwareScrollView>
                            <Text>
                                {filterTicket.map((item, index) => (
                                    <View key={index} style={styles.searchContainer}>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate("Ticket Detail", { item })}
                                        >
                                            <View style={{ marginTop: 20 }}>
                                                <Image
                                                    style={styles.movieImg}
                                                    source={{ uri: item.imagePoster }}
                                                />
                                            </View>
                                            <View style={styles.searchCnt}>
                                                {/* <Text style={styles.searchTxt}>{item.username}</Text> */}
                                                <Text style={styles.searchTxt}>{item.movie_title}</Text>
                                            </View>


                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </Text>
                        </KeyboardAwareScrollView>
                    ) : null
                }
            </View>


            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <TouchableOpacity onPress={() => navigation.navigate('Ticket Detail', { item })}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Ticket Detail', { item })}>
                                    <View style={styles.movieImg}>
                                        <Image source={{ uri: item.imagePoster }} style={styles.movieImg} />
                                    </View>
                                </TouchableOpacity>


                                <View style={styles.cnt}>
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={styles.title}>{item.movie_title}</Text>
                                    </View>

                                    <View style={styles.time}>
                                        {/*<Text>{ moment(item.createdAt).format('MMM Do YY')}</Text>*/}
                                    </View>

                                </View>

                                <View style={styles.cnt}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.price} MMK</Text>
                                </View>

                                <View style={[styles.cnt, { marginLeft: 20 }]}>
                                    {
                                        item.state.booking === true ?
                                            (
                                                null
                                            )
                                            :
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('Ticket Edit', { item })}
                                            >
                                                <AntDesign name="edit" size={24} color="green" />
                                            </TouchableOpacity>

                                    }


                                    <View style={{ marginTop: 20 }}>


                                        <TouchableOpacity
                                            onPress={() => showConfirmDialog(item)}
                                        >
                                            <MaterialIcons name="delete" size={24} color="#ed3f21" />
                                        </TouchableOpacity>
                                    </View>


                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                )
                }
            />

        </SafeAreaView>
    )
}


export default TicketListScreen;
