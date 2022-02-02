import { useRef, useState } from "react";
import "./App.css";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  orderBy,
  query,
  limit,
  Timestamp,
  addDoc
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { async } from "@firebase/util";

const firebaseConfig = {
  apiKey: "AIzaSyDQ81-2Ep9IANmud3O-PreUDUSsAABVfr0",
  authDomain: "chatreactapp-a7173.firebaseapp.com",
  projectId: "chatreactapp-a7173",
  storageBucket: "chatreactapp-a7173.appspot.com",
  messagingSenderId: "1045080412778",
  appId: "1:1045080412778:web:3553fd1fa8e2403e34f013"
};
initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();

function App() {
  const [count, setCount] = useState(0);
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header"></header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

export default App;

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return <button onClick={signInWithGoogle}>Sign In With Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.SignOut()}>Sign Out</button>
  );
}

function ChatRoom() {
  const scroll = useRef();

  const messagesRef = collection(firestore, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(q);

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: Timestamp.now(),
      uid,
      photoURL
    });

    setFormValue("");

    scroll.current.scrollIntoView();
  };

  return (
    <>
      <main>
        <div>
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        </div>
        <div ref={scroll} />
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit"></button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "recieved";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );
}
