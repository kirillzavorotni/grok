import { JetView } from "webix-jet";

export default class TabView2 extends JetView {
	config() {
		return {
			view: "datatable",
			localId: "filmsTable",
			select: "row",
			editable: true,
			columns: [
				{ id: "rank", header: "Rank", width: 70, sort: "server", editor: "text" },
				{ id: "title", header: "Film Title", fillspace: true, sort: "server", editor: "text" },
				{ id: "votes", header: "Votes", width: 100, sort: "server", editor: "text" },
				{ id: "year", header: "Year", width: 100, sort: "server", editor: "text" },
				{ id: "rating", header: "Rating", width: 100, sort: "server", editor: "text" },
			],
			scroll: "y",
			datafetch: 50,
			url: "http://localhost/backend/public/secondFilms",
			save: "rest->http://localhost/backend/public/secondFilms",
		};
	}
}