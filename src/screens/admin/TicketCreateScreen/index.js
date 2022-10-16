import React, { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, Input, FlatList } from "react-native";
import { firebase } from '../../../../config';
import SelectDropdown from 'react-native-select-dropdown'
import * as Device from 'expo-device';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CommonActions } from "@react-navigation/native";
import { doc } from "firebase/firestore";
import moment from 'moment';
import { Card, Button } from "@rneui/themed";
import styles from "./styles";
import MovieListScreen from '../movie/MovieList/movieList';

// Notification
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});


const TicketCreateScreen = ({ navigation }) => {

    const [data, setData] = useState([]);
    const dataRef = firebase.firestore().collection("tickets");

    const [movies, setMovies] = useState([]);
    const movieRef = firebase.firestore().collection('movies')
    const [selectedItem, setSelectedItem] = useState();

    const [ticketNumber, setTicketNumber] = useState("");
    const [price, setPrice] = useState("");
    const [state] = useState(false);

    const [isVisible, setVisible] = useState(false);


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const [error, setError] = useState({});

    // Notification
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    // createdAt
    const [currentDate, setCurrentDate] = useState('')

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // console.warn("A date has been picked: ", date);
        setSelectedDate(date);
        hideDatePicker();
    };

    useEffect(() => {
        readMovie();

        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    }, [])

    // Send Notification
    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "New Ticket",
                body: 'Admin created new Ticket!',
            },
            trigger: { seconds: 1 },
        });
    }

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    }

    // read Movie
    const readMovie = async () => {
        try {
            const data = [];
            var snapshot = await firebase.firestore().collection('movies').get();
            snapshot.forEach((doc) => {
                data.push(doc.data());
            })
            setData([...data])
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }

    // state booking

    const booking_state = false;

    const addData = async () => {

        if (!ticketNumber) {
            setError((prev) => {
                return {
                    ...prev,
                    ticketNumber: 'Please Enter Ticket Number',
                }
            })
        }

        if (!price) {
            setError((prev) => {
                return {
                    ...prev,
                    price: 'Please Enter Price',
                }
            })
        }

        if (!selectedItem) {
            setError((prev) => {
                return {
                    ...prev,
                    selectedItem: 'Please choose option',
                }

            })
        }
        else {
            var date = moment()
                .utcOffset('+05:30')
                .format('MMMM Do YYYY, h:mm:ss a');

            setCurrentDate(date);

            var selectedDate = moment()
                .utcOffset('+05:30')
                .format('MMMM Do YYYY, h:mm:ss a');

            setSelectedDate(selectedDate);

            if (ticketNumber && ticketNumber.length > 0 || price && price.length > 0) {
                const tickets = {
                    'ticketNumber': ticketNumber,
                    'price': parseFloat(price),
                    'movie_title': selectedItem.title,
                    'showtime': selectedDate,
                    'state': { booking: false },
                    'createdAt': date,
                }

                dataRef
                    .add(tickets)
                    .then(() => {
                        setTicketNumber('');
                        setPrice('');
                    })
                    .then(async () => {
                        Alert.alert('Successfully created')

                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "TicketList" }]
                            })
                        )

                    })
                    .catch((error) => {
                        alert(error)
                    })

                console.log('add data')
            }
        }
    };

    // Multiple Function
    const onPress = async () => {
        addData();
        await schedulePushNotification();
    }


    return (
        <View>

            <Card>
                <Card.Title>Create Ticket Screen</Card.Title>
                <Card.Divider></Card.Divider>

                <TextInput
                    style={styles.input}
                    onChangeText={(number) => setTicketNumber(number)}
                    value={ticketNumber}
                    placeholder='Ticket Number'
                    keyboardType="numeric"
                />
                {
                    !ticketNumber &&
                    <Text style={{ color: 'red', fontSize: 14, fontWeight: '300', marginLeft: 12 }}>{error.ticketNumber}</Text>
                }

                <TextInput
                    style={styles.input}
                    onChangeText={(number) => setPrice(number)}
                    value={price}
                    placeholder='Price'
                    keyboardType="numeric"
                />
                {
                    !price &&
                    <Text style={{ color: 'red', fontSize: 14, fontWeight: '300', marginLeft: 12 }}>{error.price}</Text>
                }

                <View style={styles.dropdown}>
                    <SelectDropdown
                        data={data}
                        onSelect={(selectedItem, index) => {
                            setSelectedItem(selectedItem);
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.title
                        }}
                        rowTextForSelection={(item, index) => {
                            return item.title
                        }}
                    />
                    {!selectedItem &&
                        <Text style={{ color: 'red', fontSize: 14, fontWeight: '300', marginLeft: 12 }}>{error.selectedItem}</Text>
                    }
                </View>


                <View style={styles.btn1}>

                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {selectedDate ? selectedDate.toLocaleString() : 'No date selected'} {'\n'}
                        </Text>
                    </View>

                    <View>
                        <Button title="Show Date Picker" onPress={showDatePicker} />
                    </View>


                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>


                <View style={styles.btn}>
                    <View style={{ marginRight: 10 }}>
                        <Button
                            title="Create"
                            type="outline"
                            onPress={onPress}
                        />
                    </View>

                    <View>
                        <Button
                            title='Back'
                            type="outline"
                            onPress={() => navigation.goBack()}
                        />
                    </View>


                </View>
            </Card>



        </View>
    )
}

export default TicketCreateScreen;
