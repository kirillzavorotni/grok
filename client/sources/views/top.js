import { JetView, plugins } from "webix-jet";

const menu_size = {
	width: 180,
};

export default class TopView extends JetView {
	config() {
		const menu = {
			view: "menu",
			id: "top:menu",
			css: "app_menu",
			width: menu_size.width,
			layout: "y",
			select: true,
			template: "<span class='webix_icon #icon#'></span> #value# ",
			data: [
				{ value: "Film set 1", id: "filmsSet1" },
				{ value: "Film set 2", id: "filmsSet2" },
				{ value: "Set 1 Details", id: "set1Details" },
				{ value: "Film Settings", id: "filmSettings" },
			],
			on: {
				onAfterSelect: (id) => {
					this.changeHeader(id);
				}
			},
			click: () => {
				this.app.callEvent("editCancel");
			}
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
	
	/**********************************************************************/
	init() {
		this.use(plugins.Menu, "top:menu");
	}

	changeHeader(id) {
		const header = this.$$("header");
		header.define({ template: this.$$("top:menu").getItem(id).value });
		header.refresh();
	}
}