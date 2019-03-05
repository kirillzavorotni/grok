// export const actors = new webix.DataCollection({ data:[
// 	{ id:1, firstName: "Michail", lastName: "Puzankov", birthday: 1976, country: "USA", filmID: 1 },
// 	{ id:2, firstName: "Daniel", lastName: "Menson", birthday: 1984, country: "Rus", filmID: 1 },
// 	{ id:3, firstName: "Micle", lastName: "Hurtson", birthday: 1964, country: "Brasil", filmID: 3 },
// 	{ id:4, firstName: "Yan", lastName: "Kudin", birthday: 1991, country: "Blr", filmID: 2 },
// 	{ id:5, firstName: "Max", lastName: "Power", birthday: 1945, country: "USA", filmID: 3 },
// 	{ id:6, firstName: "Andrew", lastName: "Melichow", birthday: 1986, country: "France", filmID: 2 },
// ]});

export const actors = new webix.DataCollection({
	url: "http://localhost/backend/public/actors",
	save: "rest->http://localhost/backend/public/actors",
});