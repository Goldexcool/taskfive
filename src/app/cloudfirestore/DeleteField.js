import { collection, doc, setDoc, deleteField} from "firebase/firestore"; // import firestore
import { db } from "../../../Firebase/initFirebase";
import { useState } from "react";
const DeleteField = () => {
  const DeleteFieldData = async () => {
    try {
      const docsRef = collection(db, "users");
      await setDoc(doc(docsRef, "firstFile"), {
        first: "Goldex",
        last: "Cool",
        born: deleteField(),
      }, {merge: true}).then(() => {
        alert("Document successfully Deleted!");
     
      });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <button onClick={DeleteFieldData}>Delete Field Data from cloud firestore</button>
    </div>
  );
};
export default DeleteField;
