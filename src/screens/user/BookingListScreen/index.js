import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Button, Pressable } from "react-native";
import styles from "./styles";
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { PRIMARY } from "../../../utils/styles/color";
import { Modal } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from "react-native";
import { firebase } from "../../../../config";
import { FlatList } from "react-native-gesture-handler";
import moment from "moment";

const BookingListScreen = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const dataRef = firebase.firestore().collection('tickets');
    const [data, setData] = useState([]);

    const onPress = () => {
        setModalVisible(true);
        // navigation.navigate('Booking Detail')
    }


    useEffect(() => {
        read()

        console.log('read ticket', data);
    }, [])

    // read Ticket 
    const read = async (userId) => {
        console.log("inside read function", userId);
        dataRef
            .where("userid", "==", userId)
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


    //Getting user id
    const firestore = firebase.firestore;
    const auth = firebase.auth;
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        firebase
            .firestore()
            .collection("users")
            .doc(auth().currentUser.uid)
            .get()
            .then((user) => {
                setUser(user.data());
                console.log("user id ==", user.data().id);
                read(user.data().id);
            });
    }, []);
    const uid = user?.id;
    const urname = user?.username;





    return (
        <View style={styles.container}>

            <View>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('Booking Detail', { item })}>
                                <View style={styles.mainBox}>
                                    <View style={styles.img}>
                                        <Image source={{ uri: item.imagePoster }} style={styles.movieImg} />
                                    </View>
                                    <View style={styles.movieCnt}>
                                        <View style={styles.movieTit}>
                                            <Text style={styles.title}>{item.movie_title}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                            <Feather name="type" size={20} color={PRIMARY} />
                                            <View style={{ marginLeft: 10 }}>
                                                <Text>{item.cinemaName}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                            <Entypo name="back-in-time" size={24} color={PRIMARY} />
                                            <View style={{ marginLeft: 10 }}>
                                                {/* <Text>{moment({ item.createdAt }).format('MMM Do YY')}</Text> */}
                                                <Text>{moment(item.createdAt).format('MMM Do YY')}</Text>
            
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                            <FontAwesome name="money" size={24} color={PRIMARY} />
                                            <View style={{ marginLeft: 10 }}>
                                                <Text>{item.price} MMK</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>



        </View>
    )
}

export default BookingListScreen;