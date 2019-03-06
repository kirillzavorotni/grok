export const actors = new webix.DataCollection({
	url: "http://localhost/backend/public/actors",
	save: "rest->http://localhost/backend/public/actors",
});