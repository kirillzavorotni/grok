import { JetView } from "webix-jet";
import { filmset1 } from "models/filmset1";
import { actors } from "models/actors";

export default class TabView3 extends JetView {
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

		return {
			cols: [
				{
					rows: [
						{
							template: "Select film", type: "header", css: "filmList-header",
						},
						list
					],
				},
				{
					rows: [
						{ template: "Click below table elem to show actor info", type: "header", css: "actor-template-head" },
						{
							cols: [
								{ view: "spacer" },
								{ view: "template", template: "", localId: "filmTemplate", width: 280, css: "actor-template-body" },
								{ view: "spacer" },
							]
						},
						{ template: "Actors table", type: "header", css: "actor-table-head" },
						{
							view: "datatable",
							localId: "elementTable",
							editable: true,
							select: "row",
							columns: [
								{ id: "firstName", header: "Name", width: 150, editor: "text" },
								{ id: "lastName", header: "Surname", fillspace: true, editor: "text" },
							],
							on: {
								onAfterSelect: (id) => {
									this._actorId = actors.getItem(id).id;
									this.defineTemplate(this.getTemplate(actors.getItem(id)));
								},
								onAfterEditStop: () => {
									this.defineTemplate(this.getTemplate(actors.getItem(this._actorId)));
								}
							}
						}
					],
				},
			],
		};
	}

	init() {
		this.$$("filmList").sync(filmset1);
		this.$$("elementTable").sync(actors);
	}

	urlChange() {
		webix.promise.all([
			filmset1.waitData,
			actors.waitData,
		]).then(() => {
			const id = this.getParam("id");
			if (id && filmset1.exists(id)) {
				this.$$("filmList").select(id);
				this.defineTemplate("");
				this.$$("elementTable").filter(function (obj) {
					return obj.filmID == id;
				});
			} else {
				this.$$("elementTable").filter(function () {
					return false;
				});
				this.$$("filmList").unselectAll();
				this.defineTemplate("");
			}
		});
	}

	getTemplate(item) {
		return `
		<div class="actor-info-wrap">
			<p class="actor-name">${item.firstName} ${item.lastName}</p>
			<p class="actor-birth">Birthday - ${item.birthday}</p>
			<p class="actor-country">Country - ${item.country}</p>
		</div>
		`;
	}

	defineTemplate(item) {
		this.$$("filmTemplate").define("template", item);
		this.$$("filmTemplate").refresh();
	}
}