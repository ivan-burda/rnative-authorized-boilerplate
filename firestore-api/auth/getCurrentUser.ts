import {getAuth, onAuthStateChanged, User} from "firebase/auth";
import {app} from "../../firebaseConfig";

export type LoggedInUserDetails = Pick<User, 'displayName' | 'email' | 'photoURL' | 'uid'> | null


export const getCurrentUserFull = (): User | null => {
    const auth = getAuth(app);
    return auth.currentUser;
};