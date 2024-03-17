import {getDatabase, ref, set} from "firebase/database";
import {createUserWithEmailAndPassword, getAuth, deleteUser as deleteUserFirebase} from "firebase/auth";
import {app} from "../firebaseConfig";
import {Alert} from "react-native";

const auth = getAuth(app);
const db = getDatabase(app);

interface RegisterUser {
    email: string;
    password: string;
    username: string;
    isAuthenticatingCb: (isAuthenticating: boolean) => void;
}

export const registerUser = async ({email, password, username, isAuthenticatingCb}: RegisterUser) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            if (userCredential.user) {
                createProfile(email, username);
            }
        })
        .catch((error) => {
            Alert.alert("User creation failed", "Please check entered data and try again.");
            isAuthenticatingCb(false);
        });
};

const createProfile = async (email: any, username: string) => {
    set(ref(db, 'users/' + username), {
        username: username,
        email: email,
    })
        .then(() => {
            console.log('Profile created.');
        })
        .catch(() => {
            console.log('Profile creation failed.');
        });
};

export const deleteUser = () => {
    const user = auth.currentUser;
    if (!user) {
        return;
    }
    deleteUserFirebase(user)
        .then(() => console.log('Registration successfully deleted'))
        .catch(() => console.log('Deleting user failed'));

};

export const logout = async () => {
    await auth.signOut();
};