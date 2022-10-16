import { StyleSheet } from "react-native";
import { PRIMARY } from "../../../utils/styles/color";


const styles = StyleSheet.create({

    container: {
        marginTop: 10
    },

    mainBox: {
        backgroundColor: '#f5fffa',
        width: '90%',
        height: 150,
        marginHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        marginVertical: 20
    },

    movieImg: {
        resizeMode: "cover",
        width: 200,
        height: 100,
    },

    img: {
        marginLeft: 10,
        marginVertical: 20
    },

    movieCnt: {
        flexDirection: 'column',
        marginTop: 20,
        marginLeft: 10
    },

    movieTit: {
        marginBottom: 5
    },

    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#908277'
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#DDDDDD",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#ed3f21",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

    bookDetailMainBox: {
        flexDirection: 'row',
        marginVertical: 20,
    },

    bookDetailTit: {
        marginRight: 10
    },

    bookDetailCnt: {
        marginTop: 15
    }

})

export default styles;


