import {getAuth} from "firebase/auth";
import {app} from "../../firebaseConfig";

export const auth = getAuth(app);

export const logout = async () => {
    await auth.signOut();
};