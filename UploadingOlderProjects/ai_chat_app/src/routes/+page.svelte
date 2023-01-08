<script lang="ts">
	async function checkToken() {
		document.cookie = `Authorization=${token}`;
		console.log("doing redirect");
		document.location.href = "/talk";
		return 1;
	}
	function isEnter(e: KeyboardEvent) {
		if (e.key === "Enter") {
			e.preventDefault();
			checkToken();
			return 1;
		}
		return 0;
	}
	let token: string = "";
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<html class="w-full h-full">
	<body class="w-full h-full bg-slate-800">
		<div class="h-full flex flex-row items-center">
			<div class="mx-auto">
				<p class="text-white text-center">Enter your access token.</p>
				<div class="flex flex-row">
					<input
						type="password"
						class="rounded-full outline-none px-4 p-2 mx-auto"
						bind:value={token}
						on:keypress={isEnter}
					/>

					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						on:click={checkToken}
						class="bg-blue-600 h-10 w-10 rounded-full ml-4 hover:bg-blue-500 active:bg-blue-700"
					>
						<img src="arrow-down.png" alt="^" class="-rotate-90" />
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
