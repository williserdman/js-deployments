<script lang="ts">
	import Modal from "$lib/components/Modal.svelte";
	import { info } from "$lib/modules/stores";
	import type { PageData } from "./$types";
	import { invalidateAll } from "$app/navigation";
	import { onMount } from "svelte";
	import ModalContents from "$lib/components/ModalContents.svelte";

	let modal: HTMLDivElement | undefined;
	export let data: PageData;

	let modalShow = false;
	function showModal(e: MouseEvent | undefined) {
		if (!e) return;
		e.cancelBubble = true;
		modalShow = !modalShow;
	}
	function hideModal() {
		modalShow = false;
	}

	async function updateModel() {
		return fetch("/api/talk", {
			method: "POST",
			headers: {
				Authorization: data.Authorization
			},
			body: JSON.stringify({ otherInfo: $info })
		});
	}
	async function askModel(userQ: string) {
		console.log("q", userQ);
		return fetch("/api/talk", {
			headers: {
				Authorization: data.Authorization,
				prompt: userQ
			}
		});
	}
	async function query(userQ: string) {
		console.log(await updateModel());
		return askModel(userQ);
	}

	let userQ: string = "";
	let messages: string[] = [];
	let msgBox: HTMLDivElement | null;
	let waitingForServer = false;
	async function handleMessage() {
		if (waitingForServer) {
			alert("one message at a time please");
			return 0;
		}
		if (userQ === "") return 0;
		waitingForServer = true;
		messages.push(userQ);
		messages = messages;
		const tmpString = userQ;
		userQ = "";
		let tmp = await query(tmpString);
		messages.push((await tmp.json()).response);
		messages = messages;
		await new Promise((r) => setTimeout(r, 10));
		if (msgBox) msgBox.scrollTop = msgBox?.scrollHeight;
		waitingForServer = false;
		return 1;
	}

	function isEnter(e: KeyboardEvent) {
		if (e.key === "Enter") {
			e.preventDefault();
			handleMessage();
			return 1;
		}
		return 0;
	}

	onMount(() => {
		messages = data.oldMessages;
		$info = data.clientInfo;
	});
</script>

<svelte:window on:click={hideModal} />

<html lang="html" class="m-0 p-0 h-full overflow-hidden">
	<body class="h-full flex flex-col">
		<div class="basis-1/12 bg-slate-700">
			<div bind:this={modal} class="modal m-0" hidden={!modalShow}>
				<Modal on:hide={hideModal}><ModalContents /></Modal>
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="flex w-full h-full flex-row">
				<img
					src="img_451571.png"
					class="self-center h-10 ml-10"
					alt="client info"
					on:click={showModal}
				/>
				<img
					src="img_488153.png"
					alt="user settings"
					class="self-center ml-auto h-10 mr-10"
					on:click={() => {
						document.cookie = "Authorization=";
						invalidateAll();
					}}
				/>
			</div>
		</div>

		<div class="basis-11/12 flex flex-col grow-0 min-h-0">
			<div class="bg-slate-800 w-full basis-11/12 h-0 overflow-auto min-h-0" bind:this={msgBox}>
				<div class="msg-box w-full">
					{#each messages as msg, i}
						<p class={i % 2 === 0 ? "msg-usr" : "msg-bot"}>{msg}</p>
					{/each}
				</div>
			</div>
			<div class="w-full bg-slate-700 basis-1/12 flex flex-row items-center shrink-0">
				<div class="self-center w-full">
					<div class="text-center">
						<div class="flex flex-row">
							<div class="basis-1/12" />
							<input
								class="p-2 px-4 rounded-full basis-9/12 focus:outline-0 border-gray-400 border-2"
								type="text"
								bind:value={userQ}
								on:keypress={isEnter}
								maxlength="1000"
							/>
							<div class="basis-1/12">
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<div
									on:click={handleMessage}
									class="bg-blue-600 h-10 w-10 rounded-full ml-4 hover:bg-blue-500 active:bg-blue-700"
								>
									<img
										src="https://www.torproject.org/static/fonts/fontawesome/png/white/solid/arrow-down.png"
										alt="^"
										class="rotate-180"
									/>
								</div>
							</div>
							<div class="basis-1/12" />
						</div>
					</div>
				</div>
			</div>
		</div></body
	>
</html>

<style>
	.btn {
		@apply bg-gray-200 rounded py-2 px-4 mx-auto;
	}
	.btn:hover {
		@apply bg-gray-400;
	}
	.btn:active {
		@apply bg-gray-800;
	}
	.msg-usr {
		@apply rounded-t-3xl rounded-l-3xl bg-blue-600 right-0 w-1/3 text-white p-2 px-4 m-2 ml-auto shadow-md break-words;
		min-width: 300px;
	}
	.msg-bot {
		@apply rounded-t-3xl rounded-r-3xl bg-gray-300 w-1/3 text-black p-2 m-2 px-4 mr-auto shadow-md break-words;
		min-width: 300px;
	}

	.msg-box {
		@apply overflow-auto;
	}
</style>
