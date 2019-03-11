import { JetView } from "webix-jet";
import { filmset1 } from "models/filmset1";
import { categories } from "models/categories";
import { serverUrl } from "models/serverUrl";

const filmList_size = {
	width: 270,
};

const film_template_size = {
	width: 200,
	height: 250,
};

const filmsTable_size = {
	col_1: 70,
	col_3: 100,
	col_4: 100,
	col_5: 100,
};

const template_row = {
	height: 250,
};

const form_rules = {
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
};

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

	/********************************************************************/
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
			width: filmList_size.width,
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
				{
					cols: [
						{
							rows: [
								{ view: "text", label: "Title", name: "title", invalidMessage: "must be filled in" },
								{ view: "text", label: "Votes", name: "votes", invalidMessage: "must be less than 1000000" },
								{ view: "text", label: "Rating", name: "rating", invalidMessage: "cannot be empty or 0, max 10" },
							],
						},
						{
							rows: [
								{ view: "richselect", label: "Category", name: "categoriesID", options: categories },
								{ view: "text", label: "Year", name: "year" },
								{ view: "text", label: "Rank", name: "rank", invalidMessage: "must be number" },
							],
						},
					],
				},
				{
					cols: [
						{ view: "spacer" },
						{
							view: "checkbox",
							labelAlign: "left",
							value: 1,
							labelRight: "Show poster",
							on: {
								onChange: (newv) => {
									this.showHideElem(newv);
								}
							}
						},
						{ view: "spacer" },
					],
				},
				{
					rows: [
						{
							localId: "templateRow",
							cols: [
								{ view: "spacer" },
								{
									view: "template",
									localId: "film-template",
									template: "<div class='template-film-img-wrap'><img src='#src#' class='film-img'></div>",
									width: film_template_size.width,
									height: film_template_size.height,
								},
								{ view: "spacer" },
							],
							height: template_row.height,
						},
						{
							view: "uploader",
							localId: "uploader",
							value: "Edit poster",
							link: "conditionLoader",
							name: "files",
							autosend: false,
							multiple: false,
							accept: "image/jpeg, image/png",
							upload: `${serverUrl}/upload`,
							formData: () => {
								return {
									film_id: this._filmID,
								};
							},
							on: {
								onUploadComplete: (response) => {
									this.$$("film-template").setValues({ src: `${serverUrl}/get/${response.media_id}` });
									filmset1.getItem(response.film_id).media_id = response.media_id;
								},
								onBeforeFileAdd: () => {
									this.upload_file = true;
								}
							}
						},
						{
							view: "button",
							type: "form",
							label: "Save",
							click: () => {
								this.saveForm();
							}
						},
						{
							view: "list",
							id: "conditionLoader",
							type: "uploader",
							autoheight: true,
							borderless: true
						},
					],
				}
			],
			elementsConfig: {
				labelAlign: "right",
			},
			rules: form_rules,
		};

		return {
			cols: [
				list,
				form,
			],
		};
	}

	/********************************************************************/
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

				if (film.media_id) {
					film.src = `${serverUrl}/get/${film.media_id}`;
				} else {
					film.src = "https://www.easymovieposter.com/Design/_images/emp_vignettes/192x296_EMPT_Blank_K.jpg";
				}

				this._filmID = film.id;
				this.$$("film-template").parse(film);
				this.upload_file = false;
			} else {
				this.$$("film-template").setValues({ src: "https://www.easymovieposter.com/Design/_images/emp_vignettes/192x296_EMPT_Blank_K.jpg" });
				list.unselect();
				form.clear();
				form.clearValidation();
			}

		});
	}

	addFile() {

		if (this.upload_file) {
			this.$$("uploader").send();
		}

	}

	saveForm() {
		const form = this.$$("filmForm");

		if (this.$$("filmList").getSelectedId()) {

			if (form.validate()) {
				const values = form.getValues();
				filmset1.updateItem(values.id, values);
				this.addFile();
				form.clearValidation();
				webix.message("Film is updated");
			}

		} else {
			webix.message("You need to select film");
		}

	}

	showHideElem(newv) {

		if (newv == 0) {
			this.$$("film-template").hide();
			this.$$("templateRow").define("height", 1);
			this.$$("templateRow").resize();
		} else {
			this.$$("film-template").show();
			this.$$("templateRow").define("height", template_row.height);
			this.$$("templateRow").resize();
		}
		
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
				{ id: "rank", header: ["Rank", { content: "textFilter" }], width: filmsTable_size.col_1, sort: "int", editor: "text" },
				{ id: "title", header: ["Film Title", { content: "textFilter" }], fillspace: true, sort: "text", editor: "text" },
				{ id: "votes", header: ["Votes", { content: "textFilter" }], width: filmsTable_size.col_2, sort: "int", editor: "text" },
				{ id: "year", header: ["Year", { content: "richSelectFilter" }], width: filmsTable_size.col_3, sort: "int", editor: "text" },
				{ id: "rating", header: ["Rating", { content: "textFilter" }], width: filmsTable_size.col_4, sort: "int", editor: "text" },
			],
			on: {
				onAfterSelect: (item) => {
					this.setParam("id", item.id, true);
				}
			}
		};
	}

	/********************************************************************/
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