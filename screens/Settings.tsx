import {FC, useState} from 'react';
import {Image, ImageProps, StyleSheet, Text, View} from "react-native";
import {Colors} from "../constants/colors";
import {getCurrentUser, getCurrentUserFull} from "../firestore-api/auth/getCurrentUser";

import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";
import avatar4 from "../assets/avatar4.png";
import avatar5 from "../assets/avatar5.png";
import {ImageButton} from "../components/ImageButton/ImageButton";
import {updateUser} from "../firestore-api/auth/updateUser";
import {getAuth, onAuthStateChanged, User} from "firebase/auth";
import {app} from "../firebaseConfig";

const avatarMap: Record<string, { name: string, source: ImageProps }> = {
    avatar1: {name: 'carrots', source: avatar1},
    avatar2: {name: 'giraffe', source: avatar2},
    avatar3: {name: 'fish', source: avatar3},
    avatar5: {name: 'poppy', source: avatar5},
    avatar4: {name: 'tulip', source: avatar4},
};

const FALLBACK_AVATAR_NAME = 'avatar1';

export const Settings: FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user);
            setUser(user);
        } else {
            console.log('null');
            return null;
        }
    });

    if (!user || !user) {
        return null;
    }
    return (
        <View style={styles.screen}>
            <View style={styles.userDetailsContainer}>
                <Image source={avatarMap[user?.photoURL ?? FALLBACK_AVATAR_NAME].source}
                       style={styles.userImage}/>
                <View style={styles.userDetailsTextPart}>
                    <View style={styles.userDetailTextItem}><Text
                        style={styles.displayName}>{user?.displayName}</Text></View>
                    <View style={styles.userDetailTextItem}><Text
                        style={styles.displayName}>{user?.email}</Text></View>
                </View>
            </View>
            <View style={styles.userDetailsContainer}>
                <ImageButton imageSource={avatarMap['avatar1'].source}
                             onPress={() => updateUser(user, {
                                 displayName: user?.displayName ?? '',
                                 avatarName: 'avatar1'
                             })}/>
                <ImageButton imageSource={avatarMap['avatar2'].source}
                             onPress={() => updateUser(user, {
                                 displayName: user?.displayName ?? '',
                                 avatarName: 'avatar2'
                             })}/>
                <ImageButton imageSource={avatarMap['avatar3'].source}
                             onPress={() => updateUser(user, {
                                 displayName: user?.displayName ?? '',
                                 avatarName: 'avatar3'
                             })}/>
                <ImageButton
                    imageSource={avatarMap['avatar4'].source}
                    onPress={() => updateUser(user, {
                        displayName: user?.displayName ?? '',
                        avatarName: 'avatar4'
                    })}/>
                <ImageButton imageSource={avatarMap['avatar5'].source}
                             onPress={() => updateUser(user, {
                                 displayName: user?.displayName ?? '',
                                 avatarName: 'avatar5'
                             })}/>
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