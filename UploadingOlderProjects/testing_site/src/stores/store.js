import { writable } from "svelte/store";

export const userStore = writable();

if (typeof window !== "undefined") {
  userStore.set(JSON.parse(sessionStorage.getItem("storeUser")) || "");
  if (userStore) {
    userStore.subscribe((v) =>
      sessionStorage.setItem("storeUser", JSON.stringify(v))
    );
  }
}

import { initializeApp } from "firebase/app";

// Documentation said that it was OK to have this client-side.
const firebaseConfig = {
  apiKey: "AIzaSyBujV1n5x1R8_liiHVAMV4R49dw7UlFFBY",
  authDomain: "csia-4b251.firebaseapp.com",
  projectId: "csia-4b251",
  storageBucket: "csia-4b251.appspot.com",
  messagingSenderId: "886735206368",
  appId: "1:886735206368:web:76c1aa20ef6ca953561d85"
};

export const app = initializeApp(firebaseConfig);
import { getAuth, signOut } from "firebase/auth";
export const auth = getAuth();

export function globalSignOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      userStore.set("");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}
