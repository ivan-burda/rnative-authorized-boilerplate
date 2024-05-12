import {FC} from 'react';
import {StyleSheet, View, Text} from "react-native";

interface Props {
    messageType: "SUCCESS" | "WARNING" | "DANGER";
    text: string;
}

export const Message: FC<Props> = ({messageType, text}) => {
    if (messageType === "SUCCESS") {
        return (
            <View style={[styles.messageContainer, styles.successMessageContainer]}>
                <Text style={[styles.messageText, styles.successText]}>{text}</Text>
            </View>
        );
    }
    if (messageType === "WARNING") {
        return (
            <View style={[styles.messageContainer, styles.warningMessageContainer]}>
                <Text style={[styles.messageText, styles.warningText]}>{text}</Text>
            </View>
        );
    }
    if (messageType === "DANGER") {
        return (
            <View style={[styles.messageContainer, styles.dangerMessageContainer]}>
                <Text style={[styles.messageText, styles.dangerText]}>{text}</Text>
            </View>
        );
    }
};


const styles = StyleSheet.create({
    messageContainer: {
        width: "90%",
        borderRadius: 5,
        marginBottom: 8,
        paddingHorizontal: 6,
        paddingVertical: 3
    },
    messageText: {
        textAlign: "center",
        lineHeight: 20,
    },
    successMessageContainer: {
        backgroundColor: 'lightgreen'
    },
    successText: {
        color: 'darkgreen',
    },
    warningMessageContainer: {
        backgroundColor: 'lemonchiffon'
    },
    warningText: {
        color: 'peru',
    },
    dangerMessageContainer: {
        backgroundColor: 'lightpink'
    },
    dangerText: {
        color: 'maroon',
    },

});