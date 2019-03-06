import { JetView } from "webix-jet";
import { filmset1 } from "models/filmset1";

export default class ChangeDataFormView extends JetView {
	config() {
		return {
			view: "window",
			head: "Change element",
			position: "center",
			modal: true,
			body: {
				rows: [
					{
						view: "form",
						localId: "itemForm",
						margin: 5,
						width: 400,
						height: 270,
						elements: [
							{
								view: "text",
								label: "Title",
								name: "title",
								invalidMessage: "must be filled in"
							},
							{
								view: "text",
								label: "Year",
								name: "year",
								invalidMessage: "between 1920 and current"
							},
							{
								view: "text",
								label: "Votes",
								name: "votes",
								invalidMessage: "must be less than 1000000"
							},
							{
								view: "text",
								label: "Rating",
								name: "rating",
								invalidMessage: "cannot be empty or 0, max 10"
							},
							{
								view: "text",
								label: "Rank",
								name: "rank",
								invalidMessage: "must be number"
							},
						],
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
					},
					{
						cols: [
							{ view: "spacer" },
							{
								view: "button",
								label: "Cancel",
								click: () => {
									this.hideWindow();
								},
							},
							{
								view: "button",
								label: "Edit",
								type: "form",
								click: () => {
									const form = this.$$("itemForm");
									if (form.validate()) {
										const values = form.getValues();
										filmset1.updateItem(values.id, values);
										this.hideWindow();
									}
								}
							},
						],
					},
				],
			}
		};
	}

	showWindow(item) {
		this.getRoot().show();
		this.$$("itemForm").setValues(item);
	}

	hideWindow(mode) {
		const window = this.getRoot();
		const form = this.$$("itemForm");
		// for stop loop
		if (mode) {
			window.hide();
		} else {
			this.app.callEvent("clearSelect");
			window.hide();
		}
		form.clearValidation();
		form.clear();
	}
}