<script lang="ts">
	import { info } from "$lib/modules/stores";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	let isMounted = false;
	onMount(() => {
		isMounted = true;
	});

	$: if (isMounted) document.cookie = `clientInfo=${$info}`;
</script>

<html lang="html">
	<div class="absolute p-4 w-full h-full">
		<h3 class="text-4xl m-4">What we know about our clients:</h3>
		<div class="w-full mt-4 flex content-center h-4/6">
			<textarea
				bind:value={$info}
				id=""
				cols="30"
				rows="10"
				wrap="soft"
				class="border-gray-200 border-2 w-11/12 mx-auto p-2 text-start resize-none"
				maxlength="2000"
			/>
			<div class="absolute w-11/12 bottom-2 h-8 mx-auto left-0 right-0 text-center">
				<p class="text-center">Your input is saved automatically. Click away at any time.</p>
			</div>
		</div>
	</div>
</html>
