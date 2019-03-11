import { serverUrl } from "models/serverUrl";

export const categories = new webix.DataCollection({
	url: `${serverUrl}/category`
});