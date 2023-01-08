<script>
  //export let code;
  export let testData;
  import { userStore, app } from "../stores/store.js";
  import SignIn from "$lib/SignIn.svelte";
  import { each } from "svelte/internal";

  const indexToLetter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]; // can be expanded if needed

  const uidList = [];
  for (const uid in testData.answers) {
    uidList.push(uid);
  }
</script>

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

<div class="container">
  <div class="is-size-1">Results</div>
  <table class="table">
    <thead>
      <th>User</th>
      {#each testData.questions as question}
        <th>Q{testData.questions.indexOf(question) + 1}</th>
      {/each}
    </thead>
    <tbody>
      {#each uidList as uid}
        <tr>
          <th>
            {uid}
          </th>
          {#each testData.answers[uid] as answer}
            <td>
              {indexToLetter[answer].toUpperCase()}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
