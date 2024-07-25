import { collection, doc, getDoc } from "firebase/firestore"; // import firestore
import { db } from "../../../Firebase/initFirebase";
import { useState } from "react";
const Read = () => {
  const readData = async () => {
    try {
      const docsRef = collection(db, "users");
      await getDoc(doc(docsRef, "firstFile"), {}).then((doc) => {
        if (doc.exists) {
          alert(JSON.stringify(doc.data()));
        } else {
          alert("No such document!");
        }
      });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <button onClick={readData}>Read Data from cloud firestore</button>
    </div>
  );
};
export default Read;
