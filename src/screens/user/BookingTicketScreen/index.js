import React, { useEffect, useState } from "react";
import styles from "./styles";
import {
    DrawerRouter,
    useIsFocused,
    useNavigation,
} from "@react-navigation/native";
import { ScrollView, Text, View, Image, Alert } from "react-native";
import { Button, Card, Input, Icon } from "@rneui/themed";
import { TouchableOpacity, Pressable } from "react-native";
import { firebase } from "../../../../config";
import moment from "moment";
import { add, cos, RotateInDownLeft } from "react-native-reanimated";
import { doc, QuerySnapshot } from "firebase/firestore";
import { FlatList, TextInput } from "react-native-gesture-handler";
import SelectDropdown from 'react-native-select-dropdown'
import { PRIMARY } from "../../../utils/styles/color";


const colours = ['orange', 'yellow', 'blue', 'green', 'indigo', 'violet'];
const getColour = () => colours[Math.floor(Math.random() * colours.length)];

const BookingTicketScreen = ({ route, navigation }) => {
    const dataRef = firebase.firestore().collection("movies");

    const [id] = useState(route.params.item.id);
    const [title] = useState(route.params.item.title);
    const [category] = useState(route.params.item.category);
    const [imagePoster] = useState(route.params.item.imagePoster);

    useEffect(() => {
        console.log("movieId", id);
        read();
        console.log('show Data', data)

        firebase
            .firestore()
            .collection("users")
            .doc(auth().currentUser.uid)
            .get()
            .then((user) => {
                setUser(user.data());
            });

        readCinema();
        console.log('cinemas', cinemas)

    }, []);

    let nowDate = new Date();

    nowDate = moment().format("YYYYMMDD");

    // read show data
    const showRef = firebase.firestore().collection("shows");
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState();

    const read = () => {
        showRef
            .where('movieId', '==', id)
            .where('date', '>=', nowDate)
            //.where('cinemaId', '==','AMatNW221006')
            .onSnapshot((querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    const { cinemaId } = doc.data();
                    const { createdAt } = doc.data();
                    const { date } = doc.data();
                    const { movieId } = doc.data();
                    const { startTime } = doc.data();
                    const { updatedAt } = doc.data();

                    data.push({
                        id: doc.id,
                        cinemaId,
                        date,
                        movieId,
                        startTime,
                        createdAt,
                        updatedAt,
                    });
                });
                setData(data);
            });
    };

    // read cinemas
    const cinemaRef = firebase.firestore().collection("cinemas");
    const [cinemas, setCinemas] = useState([]);

    const readCinema = async () => {
        cinemaRef
            .where('email', '==', 'Hekelwkakakakkaksks')
            .onSnapshot((querySnapshot) => {
                const cinemas = [];
                querySnapshot.forEach((doc) => {
                    const { address } = doc.data();
                    const { createdAt } = doc.data();
                    const { city } = doc.data();
                    const { email } = doc.data();
                    const { image } = doc.data();
                    const { name } = doc.data();
                    const { phone } = doc.data();
                    const { seatCol } = doc.data();
                    const { seatRow } = doc.data();
                    const { seatPrice } = doc.data();
                    const { updatedAt } = doc.data();

                    cinemas.push({
                        id: doc.id,
                        address,
                        createdAt,
                        city,
                        email,
                        image,
                        name,
                        phone,
                        seatCol,
                        seatRow,
                        seatPrice,
                        updatedAt,
                    });
                });
                setCinemas(cinemas);
            });
    };



    // Getting user id
    const firestore = firebase.firestore;
    const auth = firebase.auth;
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);


    const uid = user?.id;
    const urname = user?.username;
    const uremail = user?.email;
    console.log('userid', uid);
    console.log('username', urname)
    console.log('email', uremail)


    // Render Seating
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [seatNumber, setSeatNumber] = useState([]);


    const [colour, setColour] = useState(getColour());
    const handleClick = () => { setColour(getColour()); }


    // const clickSeat = (colIndex, rowIndex) => {


    //     let alpha = String.fromCharCode(72 - (rowIndex + 1))
    //     console.log("seat", colIndex, alpha)

    //     let colString = colIndex.toString();
    //     let res = alpha.concat(colString)
    //     let index = seatNumber.indexOf(res);
    //     if (index === -1) { setSeatNumber(state => [...state, res]) } else {
    //         seatNumber.splice(index, 1)
    //         setSeatNumber(seatNumber)
    //     }

    //     console.log('res', seatNumber)

    // }

    // console.log('seatNumber', seatNumber)


    const clickSeat = (colIndex, rowIndex) => {

        let seatId = getSeatId(colIndex, rowIndex)
        let index = seatNumber.indexOf(seatId);

        var array = []
        if (index == -1) array = [...seatNumber, seatId]
        else {
            array = [...seatNumber]
            array.splice(index, 1)
        }
        setSeatNumber(array)
    }

    // const seatArray = seatNumber;
    // console.log('seatArr', seatArray);

    const getSeatId = (colIndex, rowIndex) => {
        let alpha = String.fromCharCode(72 - (rowIndex + 1))
        let colString = colIndex.toString();
        return alpha.concat(colString)
    }

    const RenderSeating = ({ row, col }) => {

        let seating = [];
        let rowNumb = parseInt(row);
        let rowName = String.fromCharCode(64 + rowNumb);
        for (let rowIndex = 0; rowIndex < row; rowIndex++) {
            let seatingRow = [];
            for (let colIndex = 1; colIndex <= col; colIndex++) {
                seatingRow.push(
                    <View style={styles.seatGridBox}>
                        <View style={[styles.seatBox, {
                            backgroundColor: seatNumber.includes(getSeatId(colIndex, rowIndex)) ? 'red' : 'white'
                        }]}>
                            <TouchableOpacity
                                onPress={() => clickSeat(colIndex, rowIndex)}
                            // onPress={handleClick}
                            >
                                <Text style={[styles.seatBoxText]}>{rowName}{colIndex}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                );
            }
            seating.push(<View style={styles.seatRow}>{seatingRow}</View>);
            rowName = String.fromCharCode(rowName.charCodeAt(0) - 1);
        }

        return (
            <View style={styles.seatingContainer}>
                <Image
                    source={require("../../../../assets/img/projector.png")}
                    style={styles.projectorImg}
                />
                {seating}
            </View>
        );
    };

    // create ticket
    const [tickets, setTickets] = useState([]);
    const [currentDate, setCurrentDate] = useState();
    const ticketRef = firebase.firestore().collection("tickets");




    const createTicket = async () => {

        var date = moment()
            .utcOffset('+05:30')
            .format('MMMM Do YYYY, h:mm:ss a');

        setCurrentDate(date);

        const tickets = {
            userid: user?.id,
            username: user?.username,
            show_id: selectedItem.id,
            movie_title: title,
            image: imagePoster,
            seatNumber: seatNumber,
            state: { booking: false },
            createdAt: date
        };

        ticketRef
            .add(tickets)
            .then(() => { })
            .then(async () => {
                Alert.alert("Successfully created");

                navigation.navigate('Movies');
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <View style={styles.container}>
            {/* <ScrollView> */}
            <Text style={styles.header}>Booking Ticket Screen</Text>

            <View style={styles.gap}>
                <View style={styles.movie}>
                    <View>
                        <Image source={{ uri: imagePoster }} style={styles.movieImg} />
                    </View>

                    <View style={styles.movieCnt}>
                        <Text style={[styles.title, { fontSize: 18 }]}>{title}</Text>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <View style={styles.movieCat}>
                                <Text style={styles.movieCatTxt}>{category}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Text>JCGV Junction City</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.gap}>
                <Text style={styles.title}>
                    Pick the date you want to checkout for ticket
                </Text>

                <View style={styles.dateLayout}>
                    <SelectDropdown
                        data={data}
                        onSelect={(selectedItem, index) => {
                            setSelectedItem(selectedItem);
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return [moment(selectedItem.date).format('Do'), ' ', selectedItem.startTime]
                        }}
                        rowTextForSelection={(item, index) => {
                            return [moment(item.date).format('Do'), ' ', item.startTime]
                        }}
                    />
                </View>
            </View>


            <View style={styles.gap}>
                <Text style={styles.title}>
                    Select the seat you want to watch for ticket
                </Text>
                <FlatList
                    data={cinemas}
                    keyExtractor={(_, i) => String(i)}
                    renderItem={({ item }) => (
                        <RenderSeating row={item.seatRow} col={item.seatCol} />
                    )}
                />
            </View>

            <View style={styles.btn}>
                <Button
                    title='Create'
                    onPress={createTicket}
                    color="#ed3f21"
                />
            </View>

            {/* </ScrollView> */}
        </View>
    );
};

export default BookingTicketScreen;