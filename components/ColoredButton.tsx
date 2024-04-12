import {FC} from "react";
import {Pressable, View, Text, StyleSheet} from "react-native";
import {Ionicons} from '@expo/vector-icons';


type ButtonVariant = "INFO" | "DANGER" | "WARNING";

interface Props {
    label: string;
    variant: string;
    size: number;
    onPress: () => void;
}

export const ColoredButton: FC<Props> = ({variant, label, size, onPress}) => (
    <View style={styles.button}><Pressable style={styles.button} onPress={onPress}><Text
        style={styles.text}>{label}</Text></Pressable></View>);

const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginRight: 5

    },
    text: {
        fontSize: 16,
        marginRight: 3,
        fontWeight: "bold"
    }
});