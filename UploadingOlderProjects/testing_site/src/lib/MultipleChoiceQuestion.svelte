<script>
  export let possibleAnswers;
  export let qText;
  export let answerIndex = -1;
  export let questionIndex;
</script>

<main class="container my-5">
  <div class="box">
    <div class="is-size-4">{qText}</div>
    {#each possibleAnswers as answerText, i}
      <label
        for={questionIndex}
        class="radio my-2"
        on:click={() => (answerIndex = i)}
      >
        <input
          type="radio"
          name={questionIndex}
          bind:group={answerIndex}
          value={i}
        />
        {answerText}
      </label>
      <div />
    {/each}
  </div>
</main>
