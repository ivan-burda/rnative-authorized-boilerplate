import {FC} from "react";
import {Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";


export type ButtonVariant = "INFO" | "DANGER" | "WARNING" | "SUCCESS" | "DISABLED";

interface Props {
    disabled?: boolean;
    title: string;
    variant: ButtonVariant;
    size?: number;
    onPress: () => void;
}

const bgColorMap = {
    "INFO": {bgColor: 'grey', textColor: 'white'},
    "WARNING": {bgColor: 'gold', textColor: 'black'},
    "DANGER": {bgColor: 'crimson', textColor: 'white'},
    "SUCCESS": {bgColor: 'green', textColor: 'white'},
    "DISABLED": {bgColor: 'grey', textColor: 'lightgrey'}
};

export const ColoredButton: FC<Props> = ({disabled = false, title, variant, size, onPress}) => (
    <TouchableOpacity
        disabled={disabled}
        style={[styles.button, {backgroundColor: bgColorMap[variant].bgColor}]}
        onPress={onPress}><Text
        style={[styles.text, {color: bgColorMap[variant].textColor}]}>{title}</Text></TouchableOpacity>);

const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 5,
        marginBottom: 3,
    },
    text: {
        fontSize: 16,
    },
    buttonContainer: {
        overflow: "hidden",
        marginHorizontal: 5,
        marginVertical: 3
    },
});