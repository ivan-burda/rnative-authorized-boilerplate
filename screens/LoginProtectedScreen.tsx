import {FC} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {sharedStyles} from "../styles";


export const LoginProtectedScreen: FC = () => {
    return (
        <View style={styles.loginProtectedScreen}>
            <Text style={sharedStyles.header1}>Login-protected screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loginProtectedScreen:{
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'azure'

    },
    buttonContainer:{
        width: "80%",
        borderRadius: 10,
        overflow:"hidden",
        marginBottom: 10
    }
})