import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#908277',
        alignItems: 'center',
        justifyContent: 'center'
    },

    card: {
        backgroundColor: '#F8F8F8',
        width: 350,
        height: 500,
        marginTop: 30,
        borderRadius: 30
    },

    mainCnt: {
        flexDirection: 'row',
        marginTop: 30

    },

    mvName: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 30
    },

    title: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold'
    },

    firstCnt: {
        marginHorizontal: 30,
        flex: 1
    },

    btn: {
        width: '100%',
        height: 100,
        // height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default styles;
