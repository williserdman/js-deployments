<script>
  import DisplayResults from "$lib/DisplayResults.svelte";
  import "bulma";

  let code;
  function handleSubmit() {
    location.href = `/test-${code}`;
  }
</script>

<svelte:head>
  <title>Testing Site - Take a Test</title>
</svelte:head>

<div class="container is-fluid mt-5">
  <div class="box">
    <div class="is-size-4">Take a test:</div>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="columns">
        <div
          class="column is-four-fifths has-text-centered"
          style="width: 90%;"
        >
          <input
            type="number"
            class="input is-primary is-large is-rounded"
            placeholder="Enter test code"
            id="code"
            bind:value={code}
          />
        </div>
        <div class="column has-text-centered mt-2">
          <input
            type="submit"
            class="button is-primary has-text-weight-bold"
            value="Go!"
          />
        </div>
      </div>
      <!-- test code -->
    </form>
  </div>
  <div class="level">
    <div class="level-item">
      <a
        class="button is-large is-primary is-outlined"
        href="/create"
        sveltekit:prefetch>Make a test</a
      >
    </div>
  </div>
</div>
