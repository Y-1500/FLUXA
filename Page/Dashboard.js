import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function Dashboard({ user, goSend }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const db = getFirestore();
      const snap = await getDoc(doc(db, "users", user.uid));
      setBalance(snap.data().balance);
    };
    fetchBalance();
  }, []);

  return (
    <div>
      <h2>Welcome</h2>
      <p>{user.email}</p>

      <h3>Balance: ${balance}</h3>

      <button onClick={goSend}>Send</button>
      <button>Receive</button>

      <h4>Transactions (coming soon)</h4>
    </div>
  );
}
