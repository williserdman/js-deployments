<script>
  import { createEventDispatcher } from "svelte";

  export let question = {
    possibleAnswers: ["", "", "", ""],
    qText: "",
    type: "multipleChoice"
  };

  console.log(question);

  const dispatch = createEventDispatcher();
  function selfDestruct() {
    dispatch("destroy", {});
  }
</script>

<main class="container my-5">
  <div class="box">
    <div class="columns">
      <div class="column is-11">
        <input
          class="input mb-4 is-large"
          type="text"
          bind:value={question.qText}
          placeholder="Question Text"
        />
      </div>
      <div class="column has-text-end ml-6">
        <button on:click={selfDestruct} class="delete is-large" tabindex="-1" />
      </div>
    </div>
    {#each question.possibleAnswers as answerText, i}
      <div class="columns">
        <div class="column is-two-fifths">
          <input
            type="text"
            class="input my-2"
            bind:value={answerText}
            placeholder="Answer Number {i + 1}"
          />
        </div>
      </div>
    {/each}
  </div>
</main>
