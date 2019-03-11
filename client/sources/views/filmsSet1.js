import { JetView } from "webix-jet";
import { filmset1 } from "models/filmset1";
import changeDataForm from "views/changeDataForm";
import { categories } from "models/categories";
import { serverUrl } from "models/serverUrl";

const column_size = {
	col_1: 70,
	col_3: 100,
	col_4: 100,
	col_5: 100,
	col_6: 100,
};

const exportBtn_size = {
	width: 150,
};

const refreshBtn_size = {
	width: 150,
};

export default class TabView1 extends JetView {
	config() {
		const films_Table = {
			view: "datatable",
			localId: "filmsTable",
			select: "row",
			columns: [
				{ id: "rank", header: ["Rank", { content: "textFilter" }], width: column_size.col_1, sort: "int", },
				{ id: "title", header: ["Film Title", { content: "textFilter" }], fillspace: true, sort: "text" },
				{ id: "categoriesID", header: ["Category", { content: "richSelectFilter" }], width: column_size.col_3, sort: "text", collection: categories },
				{ id: "votes", header: ["Votes", { content: "textFilter" }], width: column_size.col_4, sort: "int" },
				{ id: "year", header: ["Year", { content: "richSelectFilter" }], width: column_size.col_5, sort: "int" },
				{ id: "rating", header: ["Rating", { content: "textFilter" }], width: column_size.col_6, sort: "int" },
			],
			on: {
				onAfterSelect: (item) => {
					this.setParam("id", item.id, true);
				}
			}
		};

		return {
			rows: [
				{
					cols: [
						{
							view: "button",
							label: "Export to excel",
							type: "form",
							width: exportBtn_size.width,
							click: () => {
								webix.toExcel(this.$$("filmsTable"));
							}
						},
						{
							view: "button",
							label: "Refresh",
							width: refreshBtn_size.width,
							click: () => {
								filmset1.clearAll();
								filmset1.load(`${serverUrl}/firstFilms`);
							}
						},
						{ view: "spacer" },
					],
				},
				films_Table,
			],
		};
	}

	/********************************************************************/
	init() {
		this.$$("filmsTable").sync(filmset1);
		this.popupWindowForm = this.ui(changeDataForm);

		this.on(this.app, "clearSelect", () => {
			this.$$("filmsTable").unselectAll();
			this.show("filmsSet1");
		});
	}

	urlChange() {
		filmset1.waitData.then(() => {
			const id = this.getParam("id");

			if (id && filmset1.exists(id)) {
				this.popupWindowForm.showWindow(filmset1.getItem(id));
			} else {
				this.popupWindowForm.hideWindow("onlyHideWindow");
				this.$$("filmsTable").unselectAll();
			}

		});
	}
}
