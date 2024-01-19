import { useEffect, useState } from "react";
import { collection, db, onSnapshot } from "../firebase/config";
import { orderBy, query, where } from "firebase/firestore";

const useFirestore = (nameCollection, condition) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    let collectionRef = collection(db, nameCollection);
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      collectionRef = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue)
      );
    }

    const unSubscribe = onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocs(data);
      console.log(data);
    });

    return () => {
      unSubscribe();
    };
  }, [nameCollection, condition]);

  return docs;
};

export default useFirestore;
