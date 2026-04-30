import { useState } from "react";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc, increment } from "firebase/firestore";

export default function Send({ user, goBack }) {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const sendMoney = async () => {
    const db = getFirestore();

    const q = query(collection(db, "users"), where("email", "==", email));
    const snap = await getDocs(q);

    const receiver = snap.docs[0];

    await updateDoc(doc(db, "users", user.uid), {
      balance: increment(-Number(amount))
    });

    await updateDoc(doc(db, "users", receiver.id), {
      balance: increment(Number(amount))
    });

    alert("Money Sent!");
  };

  return (
    <div>
      <h2>Send Money</h2>

      <input placeholder="Recipient Email" onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="Amount" onChange={(e)=>setAmount(e.target.value)} />

      <button onClick={sendMoney}>Send</button>
      <button onClick={goBack}>Back</button>
    </div>
  );
}
