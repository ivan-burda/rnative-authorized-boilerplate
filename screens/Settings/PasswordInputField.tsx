import {FC} from 'react';
import {KeyboardType, StyleSheet, Text, TextInput, View} from "react-native";
import {TextInputProps} from "react-native/Libraries/Components/TextInput/TextInput";
import {Colors} from "../../constants/colors";

interface TextInputConfig {
    keyboardType: KeyboardType;
    onChangeText: (fieldValue: string) => void;
    value: string;
    secureTextEntry?: boolean;
    autoCapitalize?: TextInputProps['autoCapitalize'];
}

interface Props {
    textInputConfig: TextInputConfig;
    invalid: boolean;
}

export const PasswordInputField: FC<Props> = ({textInputConfig, invalid}) => {


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter password to delete account</Text>
            <TextInput style={styles.inputField} {...textInputConfig} />
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    label: {
        color: Colors.primary500,
        fontWeight: "bold"
    },
    inputField: {
        color: Colors.primaryText,
        width: "100%",
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
        fontSize: 12,
        borderRadius: 10,
        borderBottomColor: Colors.primary500,
        borderBottomWidth: 2,
        backgroundColor: Colors.bgPrimary,
    },
});