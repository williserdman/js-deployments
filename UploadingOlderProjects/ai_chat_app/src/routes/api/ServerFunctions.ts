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

// While I don't have the API running alongside this server, these are real responses and are being used for testing.
let counter = 0;
export const mockAI = (question: string): string => {
	let rtrn: string;
	switch (counter) {
		case 0:
			rtrn = "Yes, I do.";
			break;
		case 1:
			rtrn = "About once a week.";
			break;
		case 2:
			rtrn = "Occasionally, but usually just for special films.";
			break;
		case 3:
			rtrn = "Mostly at home, on a streaming service or Blu-ray.";
			break;
		case 4:
			rtrn = "I use Netflix and Hulu.";
			break;
		case 5:
			rtrn = "Netflix starts at $8.99 per month and Hulu starts at $5.99 per month.";
			break;
		case 6:
			rtrn = "I can afford to spend up to $200,000 on a home.";
			break;
		case 7:
			rtrn =
				"I am looking for a safe, family-friendly neighborhood with good acess to schools and amenities.";
			break;
		case 8:
			rtrn = "I care about walkability a lot, so an 8 or higher.";
			break;
		case 9:
			rtrn = "Yes, I need a garage.";
			break;
		case 10:
			rtrn = "Yes, I have two children.";
			break;
		case 11:
			rtrn =
				"A realtor could show me homes that meet my needs and help me understand the value of each property. They could also provide data on potential perks or discounts I may be eligible for, such as grants or tax deductions.";
			break;
		default:
			rtrn = "I'm not sure how to answer that question.";
			break;
	}
	++counter;
	return rtrn;
};
