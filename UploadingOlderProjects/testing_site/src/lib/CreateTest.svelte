<script>
  import AddQuestion from "$lib/AddQuestion.svelte";
  import { userStore, app } from "../stores/store.js";

  import {
    get,
    getDatabase,
    ref,
    child,
    update,
    push
  } from "firebase/database";
  const db = getDatabase(app);
  const dbRef = ref(db);
  let questions = [
    {
      possibleAnswers: ["", "", "", ""],
      qText: "",
      type: "multipleChoice"
    }
  ];

  function getCode() {
    let c = Math.floor(Math.random() * 1000000);
    let used = true;
    get(child(dbRef, `tests/${c}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          used = true;
        } else {
          used = false;
        }
      })
      .catch((error) => {
        alert("There's been an error. Please try again later.");
        console.error(error);
      });

    return c;
  }

  getCode();

  function removeOne(i) {
    console.log("i:", i);
    questions.splice(i, 1);
    questions = [...questions];
  }

  function addQuestion() {
    questions = [
      ...questions,
      {
        possibleAnswers: ["", "", "", ""],
        qText: "",
        type: "multipleChoice"
      }
    ];
  }

  let disabled = false;
  function submit() {
    disabled = true;
    const code = getCode();
    const updates = {};
    updates[`tests/${code}/questions`] = questions;
    updates[`tests/${code}/creator`] = $userStore.uid;
    update(dbRef, updates);
    questions = [];
    document.getElementById("code").innerText = code;

    alert(`Your code is: ${code}. Don't lose this number!`);
  }
</script>

<svelte:head>
  <script
    src="https://kit.fontawesome.com/85af5ff527.js"
    crossorigin="anonymous"></script>
</svelte:head>

{#each questions as question, i}
  <AddQuestion bind:question on:destroy={() => removeOne(i)} />
{/each}

<div class="has-text-centered my-4">
  <button
    class="button is-primary is-outlined mr-3"
    {disabled}
    class:is-hidden={disabled}
    on:click={addQuestion}
  >
    <div><i class="fa-solid fa-plus" /> Add a Question</div>
  </button>
  <button
    class="button is-primary ml-3"
    {disabled}
    class:is-hidden={disabled}
    on:click={submit}>Submit</button
  >
</div>
<div id="code" class="is-size-1 has-text-centered" />
