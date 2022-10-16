import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 50
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
    },

    btn1: {
        alignItems: 'center',
        textColor: '#fff',
        padding: 10,
        marginLeft: 10
    },

    dropdown: {
        alignItems: 'center',
        marginBottom: 5
    }
});

export default styles;
