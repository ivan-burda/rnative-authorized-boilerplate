import {getAuth} from "firebase/auth";
import {app} from "../../firebaseConfig";

export const getCurrentUserId = (): string | null => {
    const auth = getAuth(app);
    return auth.currentUser?.uid ?? null;
};

export const getCurrentUserEmail = (): string | null => {
    const auth = getAuth(app);
    return auth.currentUser?.email ?? null;
};