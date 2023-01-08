<script context="module">

  export async function load(context) {
    return {
      props: { code: context.params.code }
    };
  }

</script>

<script>
  import MultipleChoiceQuestion from "$lib/MultipleChoiceQuestion.svelte";
  import DisplayResults from "$lib/DisplayResults.svelte";
  import { userStore, app } from "../stores/store.js";
  export let code;
  let badCode;
  let serverError;
  let testData;

  import SignIn from "$lib/SignIn.svelte";
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
  get(child(dbRef, `tests/${code}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        testData = snapshot.val();
      } else {
        badCode = true;
      }
    })
    .catch((error) => {
      serverError = true;
      console.error(error);
    });

  let answerIndexes = [];
  let jsVariable;
  let alreadyAnswered;
  $: {
    //don't change
    try {
      jsVariable = testData.questions[0].type;
      alreadyAnswered = $userStore.uid in testData.answers;
    } catch (error) {}
  }

  let clicked = false;

  function submit() {
    if (!clicked) {
      clicked = true;
      const updates = {};
      updates[`tests/${code}/answers/` + $userStore.uid] = answerIndexes;
      update(dbRef, updates);
      location.href = "/";
    }
  }

  let isCreator = false;
  $: {
    try {
      if ($userStore.uid == testData.creator) {
        isCreator = true;
      }
    } catch (error) {}
  }
</script>

<svelte:head>
  <title>
    Testing Site: {code}
  </title></svelte:head
>

<div
  class="modal is-hidden"
  class:is-active={!$userStore}
  class:is-hidden={$userStore}
>
  <div class="modal-background" />
  <div class="modal-content">
    <div class="is-size-1 has-text-white">Please sign in to continue</div>
    <div class="box"><SignIn /></div>
  </div>
  <!-- svelte-ignore a11y-missing-content -->
  <a href="/" class="modal-close is-large" />
</div>

{#if $userStore}
  {#if !isCreator}
    <div class="is-size-1" class:is-hidden={!badCode}>Test not found</div>
    <div class="is-size-1" class:is-hidden={!serverError}>
      There's been a server error, please try again later!
    </div>
    <div class="is-size-1" class:is-hidden={!alreadyAnswered}>
      You've alredy taken this test!
    </div>

    {#if jsVariable && !alreadyAnswered}
      {#each testData.questions as question, i}
        {#if question.type === "multipleChoice"}
          <MultipleChoiceQuestion
            {...question}
            questionIndex={i.toString()}
            bind:answerIndex={answerIndexes[i]}
          />
        {/if}
      {/each}
      <div class="container has-text-centered mb-6">
        <button
          class="button is-primary"
          class:is-loading={clicked}
          disabled={clicked}
          on:click={submit}>Submit</button
        >
      </div>
    {/if}
  {:else if isCreator}
    <DisplayResults {testData} />
  {/if}
{/if}
