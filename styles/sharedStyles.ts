import {StyleSheet} from "react-native";
import {Colors} from '../constants/colors';

export const sharedStyles = StyleSheet.create({
    header1: {
        fontSize: 40,
        marginBottom: 10,
        color: Colors.primary500,
    },
    errorText: {
        color: 'red',
        textAlign: "center"
    }
})