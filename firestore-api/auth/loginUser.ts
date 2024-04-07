import {Credentials} from "../../screens/RegisterScreen";
import {getReactNativePersistence, initializeAuth, signInWithEmailAndPassword} from "firebase/auth";
import {app} from "../../firebaseConfig";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

export const loginAuth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const loginUser = async ({email, password}: Credentials) => {
    signInWithEmailAndPassword(loginAuth, email, password)
        .then(r => {
            if (r.user) {
                return 'Login successful';
            }
        })
        .catch(e => {
            return 'Login error';
        });
};