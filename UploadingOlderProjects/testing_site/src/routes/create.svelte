<script>
  import { userStore } from "../stores/store.js";
  import SignIn from "$lib/SignIn.svelte";
  import CreateTest from "$lib/CreateTest.svelte";
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

<CreateTest />
