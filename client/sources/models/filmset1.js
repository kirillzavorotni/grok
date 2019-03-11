import { serverUrl } from "models/serverUrl";

export const filmset1 = new webix.DataCollection({
	url: `${serverUrl}/firstFilms`,
	save: `rest->${serverUrl}/firstFilms/`,
});