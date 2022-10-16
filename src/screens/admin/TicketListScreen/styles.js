import { StyleSheet } from "react-native";
import { SECONDARY } from "../../../utils/styles/color";
import { PRIMARY } from "../../../utils/styles/color";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 0
    },

    card: {
        marginTop: 30,
        paddingHorizontal: 30
    },

    movieImg: {
        marginHorizontal: 20,
    },

    cnt: {
        marginTop: 20,
        //marginLeft: 5
    },

    title: {
        fontWeight: 'bold',
        fontSize: 18
    },

    time: {
        width: 160
    },

    btn: {
        flexDirection: 'row',
        marginHorizontal: 20
    },

    movieImg: {
        resizeMode: 'cover',
        width: 100,
        height: 100
    },

    // search

    searchContainer: {
        flexDirection: 'column',
        paddingHorizontal: 20,
    },

    searchTxt: {
        fontSize: 15
    },

    searchCnt: {
        alignItems: 'center',
        marginTop: 10
    }


})


export default styles;
