import { getDatabase, ref, set } from "firebase/database";
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth";
import {app} from "../firebaseConfig";
import {Alert} from "react-native";

export const registerUser  = async (email: string, password: string, username:string, cb:(isAuthenticating: boolean)=>void) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const email = userCredential.user.email;
            if(email){
                createProfile(email, username);
            }

        })
        .catch((error) => {
            Alert.alert("User creation failed","Cannot create a new user. Please check entered data and try again.")
            cb(false)
        })
}

export const createProfile = async (email:any, username:string) => {
    const db = getDatabase(app);
    await set(ref(db, 'users/' + username), {
        username: username,
        email: email,
    });
};

export const logout = async() => {
    const auth = getAuth(app);
    await auth.signOut()
};