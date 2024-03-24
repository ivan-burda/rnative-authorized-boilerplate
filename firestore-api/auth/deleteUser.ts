import {deleteUser as deleteUserFirebase} from "firebase/auth";
import {auth} from "./logout";


export const deleteUser = () => {
    const user = auth.currentUser;
    if (!user) {
        return;
    }
    deleteUserFirebase(user)
        .then(() => console.log('Registration successfully deleted'))
        .catch(() => console.log('Deleting user failed'));

};