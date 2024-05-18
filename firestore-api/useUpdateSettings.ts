import {useState} from 'react';
import {UserDetails} from "../screens/Settings/Settings";


import {getDatabase, ref, update} from 'firebase/database';

interface HookResult {
    updateUser: (updatedData: Partial<UserDetails>) => Promise<void>;
    loading: boolean;
    error: string | null;
}

export const useUpdateSettings = (currentUserId: string | null): HookResult => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateUser = async (updatedData: Partial<UserDetails>) => {
        setLoading(true);
        setError(null);

        const db = getDatabase();
        const userRef = ref(db, `users/${currentUserId}`);

        try {
            await update(userRef, updatedData);
        } catch (error) {
            console.error("Error updating user data:", error);
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return {updateUser, loading, error};
};