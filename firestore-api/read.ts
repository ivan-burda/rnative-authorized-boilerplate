import {getDatabase, onValue, ref} from "firebase/database";

export const readData = (userId: string, dataPath: string) => {
    const db = getDatabase();
    const dataRef = ref(db, userId,);
    const data = onValue(dataRef, (snapshot) => {
        return snapshot.val();
    });
    return data;
};