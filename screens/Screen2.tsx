import {FC} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {sharedStyles} from "../styles";


export const Screen2: FC = () => {
    return (
        <View style={styles.screen}>
            <Text style={sharedStyles.header1}>Screen2</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
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