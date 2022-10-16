import { StyleSheet } from "react-native";
import { PRIMARY } from "../../../utils/styles/color";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        fontSize: 25,
        marginBottom: 40,
        textAlign: 'center'
    },

    title: {
        fontSize: 13,
        marginBottom: 10,
        //marginLeft: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    box: {
        backgroundColor: 'red',
        width: 100,
        height: 100,
        borderRadius: 10,
        marginHorizontal: 10
    },

    textLayout: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        color: '#fff',
        marginVertical: 40
    },

    gap: {
        marginBottom: 15,
    },

    movie: {
        flexDirection: 'row',
        marginHorizontal: 20
    },

    movieImg: {
        resizeMode: "cover",
        height: 100,
        width: 200
    },

    movieCnt: {
        marginLeft: 10,
    },

    movieCat: {
        backgroundColor: '#00ced1',
        width: 80,
        height: 30,
        borderRadius: 10,
        // marginRight: 5,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },

    movieCatTxt: {
        textAlign: 'center',
        marginVertical: 4
    },

    dateLayout: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    },

    dateBox: {
        backgroundColor: '#8AC7DB',
        width: 100,
        height: 70,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginHorizontal: 10
    },

    dateFont: {
        fontSize: 20,
        color: '#1E5162',
        marginBottom: 5
    },

    timeLayout: {
        flexDirection: 'row',
        height: 30,
    },

    timeBox: {
        backgroundColor: 'green',
        width: 80,
        height: 30,
        borderRadius: 5,
        marginHorizontal: 5,
    },

    timeText: {
        color: '#fff',
        marginVertical: 4
    },

    seatLayout: {
        flexDirection: 'column'
    },

    seatBox: {
        backgroundColor: '#737373',
        width: 50,
        height: 40,
        marginHorizontal: 5,
        marginVertical: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },

    seatColumn: {
        width: 40,
        height: 40,
        backgroundColor: '#E74C3C',
        marginVertical: 5,
        borderRadius: 40,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 10
    },

    totalPrice: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },

    totalPriceText: {
        marginVertical: 5
    },

    underline: {
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 1,
        marginTop: 5
    },

    payment: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },

    paymentImg: {
        width: 60,
        height: 30,
        marginRight: 5
    },

    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        flexDirection: 'row',
    },

    // Seating
    seatingContainer: {
        alignSelf: "center",
        marginTop: 20,
    },
    projectorImg: {
        width: 'auto',
        resizeMode: "contain",
    },
    seatRow: {
        flexDirection: "row",
    },
    seatGridBox: {
        padding: 3,
    },
    seatBox: {
        width: 30,
        height: 30,
        borderColor: PRIMARY,
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: "center",
    },
    seatBoxText: {
        color: PRIMARY,
        fontSize: 10,
        fontWeight: "500",
        textAlign: "center",
    },
});

export default styles;