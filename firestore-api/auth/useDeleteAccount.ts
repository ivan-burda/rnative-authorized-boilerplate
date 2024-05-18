import {deleteUser, FirebaseError} from "firebase/auth";
import {auth} from "./logout";
import {useState} from "react";
import {getDatabase, ref, remove} from "firebase/database";
import {app} from "../../firebaseConfig";


const db = getDatabase(app);

export const useDeleteAccount = () => {
    const user = auth.currentUser;
    const [error, setError] = useState<string | null>(null);
    if (!user) {
        setError("NO_USER_AVAILABLE");
        return {
            deleteAccount: () => {
            }, error
        };
    }
    const deleteAccount = async () => {
        try {
            await deleteUser(user);
            await remove(ref(db, 'users/' + user.uid));
        } catch (error: FirebaseError) {
            setError(error.code);
        }
    };


    return {deleteAccount, error};

};