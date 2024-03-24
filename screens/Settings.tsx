import {FC} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {Colors} from "../constants/colors";
import {getCurrentUser} from "../firestore-api/auth/getCurrentUser";

const avatar1 = require("../assets/avatar1.png");
const avatar2 = require("../assets/avatar2.png");

export const Settings: FC = () => {
    const loggedInUser = getCurrentUser();
    console.log(loggedInUser);
    return (
        <View style={styles.screen}>
            <Image source={avatar1} style={styles.userImage}/>
            <Text>{loggedInUser?.displayName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.bgSecondary,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    buttonContainer: {
        width: "80%",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 10
    },
    userImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
        marginBottom: 5,
        borderWidth: 3,
        borderColor: 'seagreen',
    },
});