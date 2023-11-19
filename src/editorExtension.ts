import { EditorView, PluginValue, ViewUpdate } from "@codemirror/view";

export class ConcealViewPlugin implements PluginValue {
	constructor(view: EditorView) {
		
	}
	
	update(update: ViewUpdate) {
		console.log(update);
	}

	destroy() {

	}
}
