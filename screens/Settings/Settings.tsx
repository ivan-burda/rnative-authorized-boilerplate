import {FC} from 'react';
import {Image, ImageProps, StyleSheet, Text, View} from "react-native";
import {Colors} from "../../constants/colors";

import {avatar1, avatar2, avatar3, avatar4, avatar5} from "../../assets/images";
import {useSettingsData} from "../../firestore-api/useSettingsData";
import {ImageButton} from "../../components/ImageButton/ImageButton";
import {useUpdateSettings} from "../../firestore-api/useUpdateSettings";
import {getCurrentUserId} from "../../firestore-api/auth/getCurrentUserId";
import {ConfirmDeletion} from "./ConfirmDeletion";
import {LoadingOverlay} from "../../components/LoadingOverlay";


const avatarMap: Record<string, { name: string, source: ImageProps }> = {
    avatar1: {name: 'carrots', source: avatar1},
    avatar2: {name: 'giraffe', source: avatar2},
    avatar3: {name: 'fish', source: avatar3},
    avatar4: {name: 'tulip', source: avatar4},
    avatar5: {name: 'poppy', source: avatar5},
};

const FALLBACK_AVATAR_NAME = 'avatar1';


export interface UserDetails {
    avatar: string;
    email: string;
    username: string;
}


export const Settings: FC = () => {
    const currentUserId = getCurrentUserId();
    const {userData, loading,} = useSettingsData(currentUserId);
    const {updateUser} = useUpdateSettings(currentUserId);

    if (loading) {
        return (<LoadingOverlay message="Loading..."/>);
    }

    return (
        <View style={styles.screen}>
            <View style={styles.userDetailsContainer}>
                <Image source={avatarMap[userData?.avatar ?? FALLBACK_AVATAR_NAME]?.source ?? avatar1}
                       style={styles.userImage}/>
                <View style={styles.userDetailsTextPart}>
                    <View style={styles.userDetailTextItem}><Text
                        style={styles.displayName}>{userData?.username}</Text></View>
                    <View style={styles.userDetailTextItem}><Text
                        style={styles.displayName}>{userData?.email}</Text></View>
                </View>
            </View>
            <View style={styles.userDetailsContainer}>
                <ImageButton imageSource={avatarMap['avatar1'].source}
                             onPress={() => updateUser({avatar: 'avatar1'})}/>
                <ImageButton imageSource={avatarMap['avatar2'].source}
                             onPress={() => updateUser({avatar: 'avatar2'})}/>
                <ImageButton imageSource={avatarMap['avatar3'].source}
                             onPress={() => updateUser({avatar: 'avatar3'})}/>
                <ImageButton
                    imageSource={avatarMap['avatar4'].source}
                    onPress={() => updateUser({avatar: 'avatar4'})}/>
                <ImageButton imageSource={avatarMap['avatar5'].source}
                             onPress={() => updateUser({avatar: 'avatar5'})}/>
            </View>
            <View style={styles.userDetailsContainer}>
                <ConfirmDeletion/>
            </View>
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
    userDetailsContainer: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors.bgPrimary,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 8,
        marginBottom: 10
    },
    userDetailsTextPart: {
        paddingLeft: 10,
        width: '100%',
        flexDirection: "column",
        justifyContent: "flex-start",

    },
    userImage: {
        width: 80,
        height: 80,
        borderRadius: 20,
        marginBottom: 5,
    },
    userDetailTextItem: {
        alignItems: "flex-start",
        justifyContent: "center",
    },
    displayName: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.primary500,
        lineHeight: 40,
    },
});