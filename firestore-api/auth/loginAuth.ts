import {getReactNativePersistence, initializeAuth} from "firebase/auth";
import {app} from "../../firebaseConfig";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

export const loginAuth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});