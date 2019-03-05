import { JetView } from "webix-jet";
import { filmset1 } from "models/filmset1";
import changeDataForm from "views/changeDataForm";

export default class TabView1 extends JetView {
	config() {
		const films_Table = {
			view: "datatable",
			localId: "filmsTable",
			select: "row",
			columns: [
				{ id: "rank", header: ["Rank", { content: "textFilter" }], width: 70, sort: "int", },
				{ id: "title", header: ["Film Title", { content: "textFilter" }], fillspace: true, sort: "text" },
				{ id: "votes", header: ["Votes", { content: "textFilter" }], width: 100, sort: "int" },
				{ id: "year", header: ["Year", { content: "richSelectFilter" }], width: 100, sort: "int" },
				{ id: "rating", header: ["Rating", { content: "textFilter" }], width: 100, sort: "int" },
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
							width: 150,
							click: () => {
								webix.toExcel(this.$$("filmsTable"));
							}
						},
						{
							view: "button",
							label: "Refresh",
							width: 150,
							click: () => {
								filmset1.clearAll();
								filmset1.load("http://localhost/backend/public/firstFilms");
							}
						},
						{ view: "spacer" },
					],
				},
				films_Table,
			],
		};
	}

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
