import {getAuth, User} from "firebase/auth";
import {app} from "../../firebaseConfig";

export type LoggedInUserDetails = Pick<User, 'email' | 'uid'> | null


export const getCurrentUserId = (): string | null => {
    const auth = getAuth(app);
    return auth.currentUser?.uid ?? null;
};