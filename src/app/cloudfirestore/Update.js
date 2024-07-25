import { collection, doc, updateDoc } from "firebase/firestore"; // import firestore
import { db } from "../../../Firebase/initFirebase";
import { useState } from "react";
const Update = () => {
  const updateData = async () => {
    try {
      const docsRef = collection(db, "users");
      await updateDoc(doc(docsRef, "firstFile"), {
        first: "Gold",
        last: "hot",
        born: 2004,
        // skill: skill,
      }).then(() => {
        alert("Document successfully updated!");

      });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <button onClick={updateData}>Update Data to cloud firestore</button>
    </div>
  );
};
export default Update;
