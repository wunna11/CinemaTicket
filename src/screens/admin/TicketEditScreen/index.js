import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CommonActions } from "@react-navigation/native";
import { Timestamp } from "firebase/firestore";
import moment from 'moment';
import { Card, Button } from "@rneui/themed";
import styles from "./styles";

import { firebase } from '../../../../config';

const TicketEditScreen = ({ route, navigation }) => {

    const dataRef = firebase.firestore().collection("tickets");

    const [data, setData] = useState([]);
    const movieRef = firebase.firestore().collection('movies')
    const [selectedItem, setSelectedItem] = useState();


    const [ticketNumber, setTicketNumber] = useState(route.params.item.ticketNumber);
    const [price, setPrice] = useState(route.params.item.price);
    const [showtime, setShowtime] = useState(route.params.item.showtime);
    const [createdAt] = useState(route.params.item.createdAt)

    const [isVisible, setVisible] = useState(false);


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const [error, setError] = useState({});

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
    }, [])

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

    const update = async () => {

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
        } else {

            var date = moment()
                .utcOffset('+05:30')
                .format('MMMM Do YYYY, h:mm:ss a');

            setCurrentDate(date);

            var selectedDate = moment()
                .utcOffset('+05:30')
                .format('MMMM Do YYYY, h:mm:ss a');

            setSelectedDate(selectedDate);

            if (ticketNumber && ticketNumber.length > 0 || price && price.length > 0 || selectedDate || selectedItem) {
                dataRef
                    .doc(route.params.item.id)
                    .update({
                        ticketNumber: ticketNumber,
                        price: parseFloat(price),
                        movie_title: selectedItem.title,
                        showtime: selectedDate,
                        createdAt: date,
                    })
                    .then(async () => {
                        Alert.alert("Successfully Updated");

                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "TicketList" }]
                            })
                        )

                        console.log('updated data')
                    })
                    .catch((error) => {
                        alert(error)
                    })


            }
        }



    }

    return (
        <View style={styles.container}>
            <Card>
                <Card.Title>Edit Ticket Screen</Card.Title>
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
                            title="Update"
                            type="outline"
                            onPress={() => update()}
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

export default TicketEditScreen;
