import { collection, doc, deleteDoc } from "firebase/firestore"; // import firestore
import { db } from "../../../Firebase/initFirebase";
import { useState } from "react";
const Delete = () => {
  const DeleteData = async () => {
    try {
      const docsRef = collection(db, "users");
    //   await deleteDoc(doc(docsRef, "firstFile")).then(() => {
    //     alert("Document deleted successfully!");
    //   });

      await deleteDoc(doc(docsRef)).then(() => {
        alert("Document deleted successfully!");
      });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <button onClick={DeleteData}>Delete Data From cloud firestore</button>
    </div>
  );
};
export default Delete;
