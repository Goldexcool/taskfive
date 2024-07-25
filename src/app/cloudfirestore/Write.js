import { collection, doc, setDoc } from "firebase/firestore"; // import firestore
import { db } from "../../../Firebase/initFirebase";
import { useState } from "react";
const Write = () => {
  const [skill, setSkill] = useState("");
  const getValue = (e) => {
    setSkill(e.target.value);
  };
  const sendData = async () => {
    try {
      const docsRef = collection(db, "users");
      await setDoc(doc(docsRef, "firstFile"), {
        first: "Goldex",
        last: "Cool",
        born: 2000,
        skill: skill,
      }).then(() => {
        alert("Document successfully written!");
        setSkill("");
      });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <input value={skill} onChange={getValue} />
      <br/>
      <button onClick={sendData}>Send Data to cloud firestore</button>
    </div>
  );
};
export default Write;
