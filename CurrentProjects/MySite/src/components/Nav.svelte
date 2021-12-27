<script>
	import { beforeUpdate } from "svelte";

	let burgerButton = false;
</script>

<nav class="navbar has-shadow is-white">
	<div class="navbar-brand">
		<a href="/" class="navbar-item">
			<img src="BrandImage.png" style="max-height: 64px;" alt="PDX Websites" class="py-2 px-2" /></a
		>
		<div
			class="navbar-burger"
			class:is-active={burgerButton}
			on:click={() => {
				burgerButton = !burgerButton;
			}}
		>
			<span />
			<span />
			<span />
		</div>
	</div>
	<div class="navbar-menu" class:is-active={burgerButton} id="main-menu">
		<div class="navbar-end">
			<a href="#about" class="navbar-item is-success is-uppercase text-is-centered">About Us</a>
			<div class="navbar-item">
				<a href="#contact" class="navbar-item button is-medium is-success is-uppercase"
					><strong>Get In Touch!</strong></a
				>
			</div>
		</div>
	</div>
</nav>
