import { AUTHORIZED_USERS } from "$env/static/private";
const authList = AUTHORIZED_USERS.split(" ");
export const isAuthorized = (authkey: string | null): boolean => {
	if (!authkey) return false;
	if (authList.includes(authkey)) {
		return true;
	}
	return false;
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, connectDatabaseEmulator } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	databaseURL: "https://validate-today-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//connectDatabaseEmulator(db, "localhost", 9000)

export const updateClientInfo = async (userID: string, clientInfo: string) => {
	return await set(ref(db, "/users/" + userID + "/" + "clientInfo"), clientInfo);
};

export const updateOldMessages = async (userID: string, newestMessage: string) => {
	// docs for this: https://firebase.google.com/docs/database/web/lists-of-data#append_to_a_list_of_data
	const msgListRef = ref(db, "/users/" + userID + "/oldMessages/");
	const msgToAddRef = push(msgListRef);
	return await set(msgToAddRef, newestMessage);
};

export const getOldMessages = async (userID: string) => {
	return (await get(ref(db, "users/" + userID + "/oldMessages"))).val() ?? {};

	/* 
		.then((snapshot) => {
			if (snapshot.exists()) {
				//console.log(snapshot.val());
				return snapshot.val();
			} else {
				console.log("No data available");
				return {};
			}
		})
		.catch((e) => console.log(e)); */
};

export const getClientInfo = async (userID: string) => {
	return (await (await get(ref(db, "users/" + userID + "/clientInfo"))).val()) ?? "";
};

import axios from "axios";

import { API_KEY } from "$env/static/private";

export const mockAI = (question: string): string => {
	const GPT3_API = "https://api.openai.com/v1/engines/davinci-codex/completions";

	const options = {
		prompt: prompt,
		max_tokens: 2048,
		api_key: API_KEY
	};

	const request = {
		method: "post",
		url: GPT3_API,
		data: options
	};

	let r: string = "";

	axios(request)
		.then((response) => {
			r = response.data;
			console.log(response.data);
		})
		.catch((error) => {
			r = "ERROR";
			console.error(error);
		});
	return r;
};
