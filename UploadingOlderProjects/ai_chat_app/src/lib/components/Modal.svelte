<script lang="ts">
	import ModalContents from "./ModalContents.svelte";
	import { createEventDispatcher } from "svelte";

	const disp = createEventDispatcher();
	function selfDestruct() {
		disp("hide", {
			hide: "true"
		});
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<html lang="html">
	<div class="absolute w-full h-full bg-black opacity-50" />
	<div class="absolute w-full h-full mx-auto">
		<div class="container p-8 w-full h-full mx-auto">
			<div
				class="bg-white rounded opacity-100 w-full h-full relative"
				on:click={(e) => (e.cancelBubble = true)}
			>
				<div class="relative inset-0 w-full h-full">
					<div
						class="absolute right-0 text-3xl font-light text-gray-400 font-sans m-2 px-3 hover:cursor-pointer hover:text-gray-800 select-none z-10"
						on:click={selfDestruct}
					>
						<p>x</p>
					</div>
					<slot />
				</div>
			</div>
		</div>
	</div></html
>
