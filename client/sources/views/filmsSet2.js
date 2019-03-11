import { JetView } from "webix-jet";
import { serverUrl } from "models/serverUrl";

const filmsTable_size = {
	col_1: 70,
	col_3: 100,
	col_4: 100,
	col_5: 100,
};

export default class TabView2 extends JetView {
	config() {
		return {
			view: "datatable",
			localId: "filmsTable",
			select: "row",
			editable: true,
			columns: [
				{ id: "rank", header: "Rank", width: filmsTable_size.col_1, sort: "server", editor: "text" },
				{ id: "title", header: "Film Title", fillspace: true, sort: "server", editor: "text" },
				{ id: "votes", header: "Votes", width: filmsTable_size.col_2, sort: "server", editor: "text" },
				{ id: "year", header: "Year", width: filmsTable_size.col_3, sort: "server", editor: "text" },
				{ id: "rating", header: "Rating", width: filmsTable_size.col_4, sort: "server", editor: "text" },
			],
			scroll: "y",
			datafetch: 50,
			url: `${serverUrl}/secondFilms`,
			save: `rest->${serverUrl}/secondFilms`,
		};
	}
}