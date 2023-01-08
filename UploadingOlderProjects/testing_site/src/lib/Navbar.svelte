<script>
  let navbarToggle = false;
  import { userStore, globalSignOut } from "../stores/store.js";
</script>

<nav class="navbar has-background-light">
  <div class="navbar-brand">
    <a href="/" class="navbar-item"><strong>Testing Site</strong></a>
    <div
      class="navbar-burger {navbarToggle ? 'is-active' : ''}"
      on:click={() => (navbarToggle = !navbarToggle)}
    >
      <span />
      <span />
      <span />
    </div>
  </div>
  <div
    class="navbar-menu has-background-light {navbarToggle ? 'is-active' : ''}"
  >
    {#if $userStore}
      <div class="navbar-start">
        <div class="navbar-item">Hello {$userStore.displayName}!</div>
        <div class="navbar-item">
          <button class="button is-danger is-outlined" on:click={globalSignOut}
            >Sign Out</button
          >
        </div>
      </div>
    {/if}
    <div class="navbar-end">
      <a href="/create" class="navbar-item" sveltekit:prefetch>
        <button class="button is-outlined is-primary"
          ><strong>Make a Test!</strong></button
        >
      </a>
      <a href="/#code" class="navbar-item">
        <button class="button is-primary"><strong>Take a Test!</strong></button>
      </a>
    </div>
  </div>
</nav>
