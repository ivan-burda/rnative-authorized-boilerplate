import {deleteUser, FirebaseError, getAuth} from "firebase/auth";
import {auth} from "./logout";
import {useState} from "react";
import {getDatabase, ref, set, remove} from "firebase/database";
import {app} from "../../firebaseConfig";


const db = getDatabase(app);
type Path = string;


const removeData = (uid: string) => {
    try {
        remove(ref(db, 'users/' + uid));
        console.log('Related user data deleted');
    } catch (error: FirebaseError) {
        console.log(error);
    }
};

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
            console.log('User deleted');
        } catch (error: FirebaseError) {
            console.log(error);
            setError(error.code);
        }
    };

    return {deleteAccount, error};

};