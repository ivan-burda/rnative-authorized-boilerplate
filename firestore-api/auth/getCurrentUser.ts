import {getAuth} from "firebase/auth";
import {app} from "../../firebaseConfig";

export const getCurrentUserId = (): string | null => {
    const auth = getAuth(app);
    return auth.currentUser?.uid ?? null;
};