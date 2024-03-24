import {getAuth, User} from "firebase/auth";
import {app} from "../../firebaseConfig";

export type LoggedInUserDetails = Pick<User, 'displayName' | 'email' | 'photoURL' | 'uid'> | null

export const getCurrentUser = (): LoggedInUserDetails => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (user) {
        const {displayName, email, photoURL, uid} = user;
        return {
            displayName, email, photoURL: photoURL ?? 'avatar1', uid
        };

    } else {
        console.log("No user is signed in.");
        return null;
    }
};