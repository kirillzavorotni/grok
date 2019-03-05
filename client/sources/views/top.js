import { JetView, plugins } from "webix-jet";

export default class TopView extends JetView {
	config() {
		const menu = {
			view: "menu", id: "top:menu",
			css: "app_menu",
			width: 180, layout: "y", select: true,
			template: "<span class='webix_icon #icon#'></span> #value# ",
			data: [
				{ value: "Film set 1", id: "filmsSet1" },
				{ value: "Film set 2", id: "filmsSet2" },
				{ value: "Set 1 Details", id: "set1Details" },
				{ value: "Tab 4", id: "tab-4" },
			],
			on: {
				onAfterSelect: function (id) {
					const header = this.$scope.$$("header");
					header.define({ template: this.getItem(id).value });
					header.refresh();
				}
			},
		};

		const ui = {
			rows: [
				{ localId: "header", template: "Contacts", type: "header", css: "app-header" },
				{
					cols: [
						menu,
						{ $subview: true },
					]
				},
			]
		};

		return ui;
	}

	init() {
		this.use(plugins.Menu, "top:menu");
	}
}