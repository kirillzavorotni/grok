import { JetView } from "webix-jet";
import { filmset1 } from "models/filmset1";

export default class TabView4 extends JetView {
	config() {
		return {
			rows: [
				{
					view: "segmented",
					localId: "segBtn",
					multiview: true,
					value: "listTableView",
					options: [
						{ value: "List", id: "listTableView" },
						{ value: "Grid", id: "gridTableView" },
					],
					on: {
						onChange: (newv) => {
							this.setParam("mode", newv, true);
						}
					}
				},
				{
					cells: [
						{
							id: "listTableView",
							$subview: ListTableView,
						},
						{
							id: "gridTableView",
							$subview: GridTableView,
						},
					],
				},
			],
		};
	}

	urlChange() {
		const segVal = this.$$("segBtn").getValue();
		const mode = this.getParam("mode");
		if (mode && mode === "listTableView") {
			this.$$("segBtn").setValue("listTableView");
		} else if (mode && mode === "gridTableView") {
			this.$$("segBtn").setValue("gridTableView");
		} else {
			this.setParam("mode", segVal, true);
		}
	}
}

class ListTableView extends JetView {
	config() {
		const list = {
			view: "list",
			localId: "filmList",
			width: 270,
			select: true,
			scroll: true,
			template: "#rank#. #title#",
			on: {
				"onAfterSelect": (id) => {
					this.setParam("id", id, true);
				},
			},
		};

		const form = {
			view: "form",
			localId: "filmForm",
			autoheight: false,
			elements: [
				{ view: "text", label: "Title", name: "title", invalidMessage: "must be filled in" },
				{
					cols: [
						{
							rows: [
								{ view: "text", label: "Votes", name: "votes", invalidMessage: "must be less than 1000000" },
								{ view: "text", label: "Rating", name: "rating", invalidMessage: "cannot be empty or 0, max 10" },
							],
						},
						{
							rows: [
								{ view: "text", label: "Year", name: "year", invalidMessage: "between 1920 and current" },
								{ view: "text", label: "Rank", name: "rank", invalidMessage: "must be number" },
							],
						},
					],
				},
				{
					cols: [
						{
							view: "button",
							type: "form",
							label: "Save",
							click: () => {
								const form = this.$$("filmForm");
								if (this.$$("filmList").getSelectedId()) {
									if (form.validate()) {
										const values = form.getValues();
										filmset1.updateItem(values.id, values);
										form.clearValidation();
										webix.message("Film is updated");
									}
								} else {
									webix.message("You need to select film");
								}
							}
						},
						// {
						// 	view: "button",
						// 	label: "Cancel",
						// },
					],
				}
			],
			elementsConfig: {
				labelAlign: "right",
			},
			rules: {
				title: webix.rules.isNotEmpty,
				year: value => {
					return value >= 1920 && value <= new Date().getFullYear();
				},
				rating: value => {
					return value > 0 && value <= 10;
				},
				rank: webix.rules.isNumber,
				votes: value => {
					return value >= 0 && value <= 1000000;
				},
			},
		};

		return {
			cols: [
				list,
				form,
			],
		};
	}

	init() {
		this.$$("filmList").sync(filmset1);
	}

	urlChange() {
		const list = this.$$("filmList");
		const form = this.$$("filmForm");
		filmset1.waitData.then(() => {
			const id = this.getParam("id");
			if (id && filmset1.exists(id)) {
				list.select(id);
				const film = filmset1.getItem(id);
				form.setValues(film);
			} else {
				list.unselect();
				form.clear();
				form.clearValidation();
			}
		});
	}
}

class GridTableView extends JetView {
	config() {
		return {
			view: "datatable",
			localId: "filmsTable",
			select: "row",
			editable: true,
			columns: [
				{ id: "rank", header: ["Rank", { content: "textFilter" }], width: 70, sort: "int", editor: "text" },
				{ id: "title", header: ["Film Title", { content: "textFilter" }], fillspace: true, sort: "text", editor: "text" },
				{ id: "votes", header: ["Votes", { content: "textFilter" }], width: 100, sort: "int", editor: "text" },
				{ id: "year", header: ["Year", { content: "richSelectFilter" }], width: 100, sort: "int", editor: "text" },
				{ id: "rating", header: ["Rating", { content: "textFilter" }], width: 100, sort: "int", editor: "text" },
			],
			on: {
				onAfterSelect: (item) => {
					this.setParam("id", item.id, true);
				}
			}
		};
	}

	init() {
		this.$$("filmsTable").sync(filmset1);
	}

	urlChange() {
		const table = this.$$("filmsTable");
		filmset1.waitData.then(() => {
			const id = this.getParam("id");
			if (id && filmset1.exists(id)) {
				table.select(id);
			} else {
				table.unselect();
			}
		});
	}
}