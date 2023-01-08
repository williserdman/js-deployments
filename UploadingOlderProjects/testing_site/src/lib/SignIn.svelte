<script>
  // Authentication
  import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
  } from "firebase/auth";

  import { userStore } from "../stores/store.js";

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  function promptSignIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        userStore.set(result.user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
</script>

<!-- this one should work on more devices but it's slower -->
<!-- <script>
  import {
    getAuth,
    signInWithRedirect,
    GoogleAuthProvider,
    getRedirectResult
  } from "firebase/auth";
  import { userStore } from "../stores/store.js";

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  function promptSignIn() {
    signInWithRedirect(auth, provider);
    let loading = true;
  }

  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      userStore.set(result.user);
    })
    .catch((error) => {
      console.log("error:", error);
      /*       // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ... */
    });
</script> -->

<!-- svelte-ignore non-top-level-reactive-declaration -->

<!-- sign in with popup works smoother on my computer. however, doens't work on mobile and doesn't appear to work on all computers -->
<!-- both redirect and popup now working. redirect takes a second after getting back to the site -->

<main class="container">
  <button class="button is-primary" on:click={promptSignIn}
    >Sign in With Google</button
  >
</main>
