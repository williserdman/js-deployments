import type { RequestEvent } from "./$types";
import { isAuthorized, mockAI, updateClientInfo, updateOldMessages } from "../ServerFunctions";

export const GET = async ({ request }: RequestEvent) => {
	const userID = request.headers.get("Authorization") ?? "";
	if (!isAuthorized(userID)) {
		return new Response("", { status: 401 });
	}

	const msgToBot = request.headers.get("prompt") ?? "no message";
	await updateOldMessages(userID, msgToBot);

	// const otherInfo = get from account
	const otherInfo = "this is all temporary";
	const fullPrompt = constructFullPrompt(msgToBot, otherInfo);
	// now query open ai with that, and return what is returns

	console.log("this would be the full prompt: ", fullPrompt);

	const response = mockAI(msgToBot);

	await new Promise((r) => setTimeout(r, 1432));

	await updateOldMessages(userID, response);
	return new Response(JSON.stringify({ response }), {
		status: 200
	});
};

export const POST = async ({ request }: RequestEvent) => {
	const userID = request.headers.get("Authorization") ?? "";
	if (!isAuthorized(userID)) {
		return new Response("", { status: 401 });
	}

	const res = await request.json();
	const ll = updateClientInfo(userID, res.otherInfo);
	//ll.then((v) => console.log("v", v)).catch((e) => console.log("e", e));
	console.log("res", res);
	return new Response("model updated", { status: 201 });
};

const constructFullPrompt = (shortPrompt: string, otherInfo: string) => {
	return shortPrompt + otherInfo;
};
