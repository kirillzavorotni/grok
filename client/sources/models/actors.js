import { serverUrl } from "models/serverUrl";

export const actors = new webix.DataCollection({
	url: `${serverUrl}/actors`,
	save: `rest->${serverUrl}/actors`,
});