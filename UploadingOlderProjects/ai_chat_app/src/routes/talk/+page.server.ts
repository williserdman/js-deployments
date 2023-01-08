import type { PageServerLoad } from "./$types";
import { isAuthorized, getOldMessages, getClientInfo } from "../api/ServerFunctions";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies }) => {
	const authCookie = cookies.get("Authorization") ?? "";
	if (isAuthorized(authCookie)) {
		console.log("is authorized");

		// Getting the older messages, and turning it into an array. Worked on small scale
		const oldMsgObj = await getOldMessages(authCookie);
		const oldMsgList: string[] = [];
		for (const [_, val] of Object.entries(oldMsgObj)) oldMsgList.push(val as string);
		//console.log("old messages: ", oldMsgList);

		const savedClientInfo: string = await getClientInfo(authCookie);
		console.log(savedClientInfo);

		return { Authorization: authCookie, oldMessages: oldMsgList, clientInfo: savedClientInfo };
	}
	console.log("is unauthorized");
	throw redirect(303, "/");
};
