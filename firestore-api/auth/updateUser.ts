import {updateProfile, User} from "firebase/auth";
import {LoggedInUserDetails} from "./getCurrentUser";

interface UserUpdate {
    displayName: string;
    avatarName: string;
}

export const updateUser = (user: User, userUpdate: UserUpdate) => {
    updateProfile(user, {
        displayName: userUpdate.displayName,
        photoURL: userUpdate.avatarName
    }).then(() => {
        // Profile updated successfully
    }).catch((error) => {
        console.error("Error updating profile: ", error);
    });
};