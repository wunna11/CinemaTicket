import React, { useEffect, useState, useSyncExternalStore } from "react";
import { ShowDetailStyle } from "./showDetail.style";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ScrollView, Text, View, Image, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, Pressable } from "react-native";
import { firebase } from "../../../../../config";
import { getStorage, ref, deleteObject } from "firebase/storage";
import moment from "moment";
import { Dialog } from "@rneui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Components
import { MovieCardSmall } from "../../../../components/Card/MovieCardSmall";
import { LoadingScreen } from "../../../../components/Loading/LoadingScreen";
import { PrimaryButton } from "../../../../components/Button/PrimaryButton";
import { TertiaryButton } from "../../../../components/Button/TertiaryButton";
import {
    BLACK,
    PRIMARY,
    SECONDARY,
    WHITE,
} from "../../../../utils/styles/color";

const ShowDetailScreen = ({ route, navigation }) => {
    // Route Paramater
    const { movie } = route.params;

    // Firebase
    const movieDataRef = firebase.firestore().collection("movies");
    const showDataRef = firebase.firestore().collection("shows");
    const cinemaDataRef = firebase.firestore().collection("cinemas");
    const showSeatDataRef = firebase.firestore().collection("showSeat");
    const ticketDataRef = firebase.firestore().collection('tickets');
    const storage = getStorage();

    // Data List
    const [showData, setShowData] = useState(movie.shows);
    const [cinemaList, setCinemaList] = useState(movie.showingAt);
    const [dateList, setDateList] = useState(movie.showDate);
    const [showTimeList, setShowTimeList] = useState(movie.showTime);

    // Seleted Data
    const [selectedShowId, setSelectedShowId] = useState(null);
    const [selectedCinema, setSelectedCinema] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const [reservedSeatList, setReservedSeatList] = useState([]);
    const [reservedSeatNumbers, setReservedSeatNumbers] = useState([]);
    const [showIncome, setShowIncome] = useState(0);

    // Loading
    const [isLoading, setLoading] = useState(false);
    const [showSeatLoading, setShowSeatLoading] = useState(false);

    // Action button
    const [btnVisible, setBtnVisible] = useState(false);

    // Seat
    const [seatNumber, setSeatNumber] = useState([])

    // Delete Dialog
    const [visibleDialog, setVisibleDialog] = useState(false);
    const toggleDialog = () => {
        setVisibleDialog(!visibleDialog);
    };

    // Get Booking Seat Data After Choosing Show
    const getReservedData = () => {
        setShowSeatLoading(true);
        const tempShowId = showData.filter(
            (s) =>
                s.movieId == movie.id &&
                s.cinemaId == selectedCinema.id &&
                s.date == selectedDate
        );
        setSelectedShowId(tempShowId[0].id);
        const data = [];
        showSeatDataRef
            .where("showId", "==", tempShowId[0].id)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach(async (doc) => {
                    const showSeat = doc.data();
                    showSeat.id = doc.id;
                    data.push(showSeat);
                });
                setReservedSeatList(data);
                const ids = data.map((d) => d.seatNumber).sort();
                setReservedSeatNumbers(ids);
                const price = data
                    .map((d) => d.price)
                    .reduce((a, b) => parseInt(a) + parseInt(b), 0);
                // setShowIncome(price);
                setTimeout(() => {
                    setShowSeatLoading(false);
                }, 1000);
            });
    };

    // Delete Movie Action
    const deleteMovieAndShows = async () => {
        deleteOldImage(movie.imagePoster);
        deleteOldImage(movie.imageCover);
        var showsOfMovie_query = showDataRef.where("movieId", "==", movie.id);
        await showsOfMovie_query.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => doc.ref.delete());
        });
        movieDataRef
            .doc(movie.id)
            .delete()
            .then(() => {
                Alert.alert(
                    "Movie Delete",
                    "Movie and Show are successfully Deleted"
                );
                navigation.navigate("MovieList");
            })
            .catch((error) => {
                Alert.alert("Error", error);
            });
    };

    // Delete Image from Server
    const deleteOldImage = (imgUrl) => {
        const oriFileName = imgUrl.split("%2F")[1].split("?")[0];
        var imgLink = "movies/" + oriFileName;

        const desertRef = ref(storage, imgLink);
        deleteObject(desertRef)
            .then(() => {
                // console.log("Image deleted from Storage");
            })
            .catch((error) => {
                console.log("error");
            });
    };

    useEffect(() => {
        if (selectedCinema && selectedDate) {
            getReservedData();
        }
    }, [selectedCinema, selectedDate]);

    // Store Selected Cinema
    const selectingCinema = (id) => {
        const temp = cinemaList.filter((c) => c.id == id);
        setSelectedCinema(temp[0]);
    };

    // Rendering Components
    const RenderCinemaList = () => {
        const renderSelecting = cinemaList.map((item, index) => {
            if (selectedCinema && selectedCinema.id == item.id) {
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => selectingCinema(item.id)}
                    >
                        <View
                            style={[
                                ShowDetailStyle.cinemaBox,
                                ShowDetailStyle.cinemaBoxSelected,
                            ]}
                        >
                            <Text style={ShowDetailStyle.cinemaText}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                );
            } else {
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => selectingCinema(item.id)}
                    >
                        <View style={[ShowDetailStyle.cinemaBox]}>
                            <Text style={ShowDetailStyle.cinemaText}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                );
            }
        });

        return (
            <View style={ShowDetailStyle.gap}>
                <Text style={ShowDetailStyle.title}>Pick the Cinema</Text>
                <View style={ShowDetailStyle.cinemaLayout}>{renderSelecting}</View>
            </View>
        );
    };

    const RenderDateList = () => {
        const renderSelecting = dateList.map((item, index) => {
            if (selectedDate == item) {
                return (
                    <TouchableOpacity key={index} onPress={() => setSelectedDate(item)}>
                        <View
                            style={[
                                ShowDetailStyle.dateBox,
                                ShowDetailStyle.cinemaBoxSelected,
                            ]}
                        >
                            <Text style={ShowDetailStyle.dayOfWeek}>
                                {moment(item).format("ddd").toUpperCase()}
                            </Text>
                            <Text style={ShowDetailStyle.dateFont}>
                                {moment(item).format("DD")}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            } else {
                return (
                    <TouchableOpacity key={index} onPress={() => setSelectedDate(item)}>
                        <View style={[ShowDetailStyle.dateBox]}>
                            <Text style={ShowDetailStyle.dayOfWeek}>
                                {moment(item).format("ddd").toUpperCase()}
                            </Text>
                            <Text style={ShowDetailStyle.dateFont}>
                                {moment(item).format("DD")}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            }
        });

        return (
            <View style={ShowDetailStyle.gap}>
                <Text style={ShowDetailStyle.title}>
                    Pick the date
                </Text>
                <View style={ShowDetailStyle.dateLayout}>{renderSelecting}</View>
            </View>
        );
    };

    const RenderTimeList = () => {
        return (
            <View style={ShowDetailStyle.gap}>
                <Text style={ShowDetailStyle.title}>Showtime</Text>
                <View style={ShowDetailStyle.timeLayout}>
                    <View style={[ShowDetailStyle.timeBox]}>
                        <Text style={ShowDetailStyle.timeText}>
                            {moment(showTimeList, "HHmm").format("hh:mm A")}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const RenderSeating = () => {
        if (!selectedCinema || !selectedDate) {
            return (
                <Text style={ShowDetailStyle.chooseAlert}>
                    ! Choose Cinema and Date
                </Text>
            );
        }

        if (showSeatLoading) {
            return <Text>Loading Seat Data...</Text>;
        }

        let seating = [];
        let rowNumb = parseInt(selectedCinema.seatRow);
        let rowName = String.fromCharCode(64 + rowNumb);
        let nextRowPrice = null;
        let seatingPrice = [];

        // Seating Price
        for (let index = 0; index < selectedCinema.seatRow; index++) {
            nextRowPrice =
                selectedCinema.seatPrice[
                String.fromCharCode(rowName.charCodeAt(0) - 1)
                ];
            seatingPrice.push(
                <View style={ShowDetailStyle.seatAndPriceBox} key={index} >
                    <View style={ShowDetailStyle.seatPriceBox}>
                        <Text style={ShowDetailStyle.seatPriceBoxText}>{rowName}</Text>
                    </View>
                    <Text style={ShowDetailStyle.seatPriceText}>
                        {selectedCinema.seatPrice[rowName]}
                    </Text>
                </View>
            );
            rowName = String.fromCharCode(rowName.charCodeAt(0) - 1);
        }

        // Seating Map View
        rowName = String.fromCharCode(64 + rowNumb);
        for (let rowIndex = 0; rowIndex < selectedCinema.seatRow; rowIndex++) {
            let seatingRow = [];
            let tempRowName;
            for (let colIndex = 1; colIndex <= selectedCinema.seatCol; colIndex++) {
                tempRowName = rowName + colIndex;
                {
                    reservedSeatNumbers.includes(tempRowName)
                        ? seatingRow.push(
                            <View style={ShowDetailStyle.seatGridBox} key={index} >
                                <View
                                    style={[
                                        ShowDetailStyle.seatBox,
                                        ShowDetailStyle.seatReserveBox,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            ShowDetailStyle.seatBoxText,
                                            ShowDetailStyle.seatReserveBoxText,
                                        ]}
                                    >
                                        {rowName}
                                        {colIndex}
                                    </Text>
                                </View>
                            </View>
                        )
                        : seatingRow.push(
                            <TouchableOpacity style={ShowDetailStyle.seatGridBox} key={colIndex} onPress={() => clickSeat(rowIndex, colIndex)}>
                                <View style={[ShowDetailStyle.seatBox,
                                seatNumber.includes(getSeatId(rowIndex, colIndex)) ? { backgroundColor: PRIMARY } : {}
                                ]}>
                                    <Text style={[ShowDetailStyle.seatBoxText, seatNumber.includes(getSeatId(rowIndex, colIndex)) ? { color: WHITE } : {}]}>
                                        {rowName}
                                        {colIndex}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                }
            }
            seating.push(<View style={ShowDetailStyle.seatRow}>{seatingRow}</View>);
            rowName = String.fromCharCode(rowName.charCodeAt(0) - 1);
        }

        return (
            <View style={ShowDetailStyle.seatingContainer}>
                <Text style={ShowDetailStyle.title}>Seating of The Show</Text>
                <View style={ShowDetailStyle.seatMapViewContainer}>
                    <Image
                        source={require("../../../../../assets/img/projector.png")}
                        style={ShowDetailStyle.projectorImg}
                    />
                    {seating}
                </View>
                <View style={ShowDetailStyle.seatPriceContainer}>{seatingPrice}</View>
            </View>
        );
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    const clickSeat = (rowIndex, colIndex) => {
        console.log("--------------------------");
        let seatId = getSeatId(rowIndex, colIndex);
        let index = seatNumber.indexOf(seatId);
        let rowName = seatId.slice(0, -1);

        let price;
        for (const [key, value] of Object.entries(selectedCinema.seatPrice)) {
            if (key == rowName) {
                price = value;
            }
        }
        var array = [];
        if (index == -1) {
            array = [...seatNumber, seatId];
            setShowIncome((prev) => prev + parseInt(price));
        }
        else {
            array = [...seatNumber];
            array.splice(index, 1);
            setShowIncome((prev) => prev - parseInt(price));
        }
        setSeatNumber(array);

        console.log('total', showIncome)
    };



    const getSeatId = (rowIndex, colIndex) => {
        let alpha = String.fromCharCode(64 + selectedCinema.seatRow - rowIndex)
        let colString = colIndex.toString();
        return alpha.concat(colString)
    }

    console.log('seat Number', seatNumber)
    console.log('seatNumber Length', seatNumber.length)

    const clickCinema = () => {
        console.log('cinema', selectedCinema.name);
        console.log('seat price', selectedCinema.seatPrice);
    }

//    const Booking = async () => {
//        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
//        const serverTime = firebase.firestore.Timestamp.now().toDate().toString();
//        // const ticketId = getCustomTicketId(serverTime);
//
//
//        const tickets = {
//            userid: user?.id,
//            username: user?.username,
//            movie_title: movie.title,
//            show_id: selectedShowId,
//            state: { booking: true },
//            imagePoster: movie.imagePoster,
//            seatNumber: seatNumber,
//            cinemaName: selectedCinema.name,
//            total: showIncome,
//            createdAt: timestamp
//        }
//
//        ticketDataRef
//            .add(tickets)
//            .then(() => {
//
//            })
//            .then(async () => {
//                Alert.alert('Successfully created')
//                navigation.navigate('MovieList')
//            })
//            .catch((error) => {
//                Alert.alert("Error", error);
//            });
//    }

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

    useEffect(() => {
        firebase
            .firestore()
            .collection("users")
            .doc(auth().currentUser.uid)
            .get()
            .then((user) => {
                setUser(user.data());
            });
    }, [])

    // Create Custom Booking Id
    const getCustomTicketId = (timestamp) => {
        var currentDate = moment(timestamp)
            .utcOffset("+06:30")
            .format("YYMMDDhhmmss");
        var filename = "Tck" + currentDate;
        return filename;
    };


    const serverTime = firebase.firestore.Timestamp.now().toDate().toString();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const ticketId = getCustomTicketId(serverTime);
    const showSeatId = getCustomTicketId(serverTime);

    const Booking = async () => {
        try {
            ticketDataRef
            .doc(ticketId)
            .set({
                userid: user?.id,
                username: user?.username,
                movie_title: movie.title,
                show_id: selectedShowId,
                state: { booking: true },
                imagePoster: movie.imagePoster,
                seatNumber: seatNumber,
                cinemaName: selectedCinema.name,
                price: showIncome,
                createdAt: timestamp
            })
            .then(() => {

            })
            .then(() => {
                showSeatDataRef
                    .doc(showSeatId)
                    .set({
                        ticketId: ticketId,
                        show_id: selectedShowId,
                        seatNumber: seatNumber,
                        total: showIncome,
                    })
                    .catch((error) => {
                        alert(error);
                    });
            })
            .then(() => {
                Alert.alert('Admin Booking Ticket Successfully');
                navigation.navigate('Movie')
            });
        
        } catch (error) {
            Alert.alert(error);
        }
        
    }

    return (
        <>
            <View style={ShowDetailStyle.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={ShowDetailStyle.headerComponent}>
                        <MovieCardSmall movie={movie} />
                        <RenderCinemaList />
                        <RenderDateList />
                        <RenderTimeList />
                    </View>
                    <View style={ShowDetailStyle.bodyComponent}>
                        <RenderSeating />
                    </View>
                    {selectedCinema && selectedDate ? (
                        <View style={ShowDetailStyle.footerComponent}>
                            <Text style={ShowDetailStyle.incomeTextKey}>
                                Reserved Seat :{" "}
                                <Text style={ShowDetailStyle.incomeTextValue}>
                                    {/* {reservedSeatNumbers.length} */}
                                    {seatNumber.map((item, key) => (
                                        <Text key={key}>{item},</Text>
                                    ))}
                                </Text>
                            </Text>
                            <Text style={ShowDetailStyle.incomeTextKey}>
                                Sum of Reserved Seat Price :{" "}
                                <Text style={ShowDetailStyle.incomeTextValue}>
                                    {showIncome} MMK
                                </Text>
                            </Text>

                            <View>
                                <PrimaryButton title="Booking" onPress={Booking} />
                            </View>
                        </View>
                    ) : null}
                </ScrollView>
            </View>
            <LinearGradient
                colors={[WHITE, "transparent"]}
                style={ShowDetailStyle.header}
            >
                <View style={ShowDetailStyle.headerRow}>
                    <View style={ShowDetailStyle.headerRow}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons
                                name="arrow-left"
                                color={PRIMARY}
                                size={36}
                            />
                        </TouchableOpacity>
                        <Text style={ShowDetailStyle.headerTitle}>Show Detail</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setBtnVisible(!btnVisible);
                        }}
                    >
                        <MaterialCommunityIcons
                            name="playlist-edit"
                            color={PRIMARY}
                            size={36}
                        />
                    </TouchableOpacity>
                </View>
                {btnVisible ? (
                    <View style={ShowDetailStyle.actionBtnBox}>
                        <PrimaryButton
                            title="Edit"
                            onPress={() =>
                                navigation.navigate("MovieEdit", {
                                    movie: movie,
                                    movieCinemaList: cinemaList,
                                    movieDateList: dateList,
                                    movieShowTimeList: showTimeList,
                                })
                            }
                        />
                        <PrimaryButton title="Delete" onPress={toggleDialog} />
                    </View>
                ) : null}
            </LinearGradient>
            <Dialog isVisible={visibleDialog} onBackdropPress={toggleDialog}>
                <Dialog.Title title="Delete" />
                <Text style={ShowDetailStyle.dialogText}>
                    Going to delete Movie and Shows from Server. Are You Sure?
                </Text>
                <View style={ShowDetailStyle.dialogBtnRow}>
                    <View style={ShowDetailStyle.dialogBtn}>
                        <TertiaryButton
                            title="Delete"
                            onPress={() => deleteMovieAndShows()}
                        />
                    </View>
                    <View style={ShowDetailStyle.dialogBtn}>
                        <PrimaryButton title="Cancle" onPress={toggleDialog} />
                    </View>
                </View>
            </Dialog>
        </>
    );
};

export default ShowDetailScreen;