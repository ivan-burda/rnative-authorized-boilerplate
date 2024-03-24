import {createUserWithEmailAndPassword, getAuth, updateProfile} from "firebase/auth";
import {Alert} from "react-native";
import {getDatabase, ref, set} from "firebase/database";
import {app} from "../../firebaseConfig";

interface RegisterUser {
    email: string;
    password: string;
    username: string;
    isAuthenticatingCb: (isAuthenticating: boolean) => void;
}

const auth = getAuth(app);
const db = getDatabase(app);

export const registerUser = async ({email, password, username, isAuthenticatingCb}: RegisterUser) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            if (userCredential.user) {
                updateProfile(userCredential.user, {
                    displayName: username,
                    photoURL: "avatar2"
                }).then(() => {
                    // Profile updated successfully
                }).catch((error) => {
                    console.error("Error updating profile: ", error);
                });
                console.log(userCredential.user);
                createProfile(email, username, userCredential.user.uid);
            }
        })
        .catch((error) => {
            console.log(error);
            Alert.alert("User creation failed", "Please check entered data and try again.");
            isAuthenticatingCb(false);
        });
};

const createProfile = async (email: any, username: string, uid: string) => {
    set(ref(db, 'users/' + uid), {
        username: username,
        email: email,
    })
        .then(() => {
            console.log('Profile created.');
        })
        .catch((e) => {
            console.log(e);
            console.log('Profile creation failed.');
        });
};