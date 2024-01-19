import { Timestamp, addDoc, collection, db } from "./config";

export const addDocument = async (nameCollection, data) => {
  await addDoc(collection(db, nameCollection), {
    ...data,
    createdAt: Timestamp.now().toDate().toString(),
  });
};
