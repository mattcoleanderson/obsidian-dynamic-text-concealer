import { syntaxTree } from "@codemirror/language";
import { RangeSetBuilder } from "@codemirror/state";
import {
	Decoration,
	DecorationSet,
	EditorView,
	MatchDecorator,
	PluginSpec,
	PluginValue,
	ViewPlugin,
	ViewUpdate,
} from "@codemirror/view";
import { MatchWidget } from "./MatchWidget";

// TODO: Currently the replaced decorater isn't editable. This is undesirable and needs to be fixed.
class ConcealViewPlugin implements PluginValue {
	decorations: DecorationSet;

	constructor(view: EditorView) {
		this.decorations = this.matchDecorator.createDeco(view); // createDeco creates the initial decoration set
	}

	update(update: ViewUpdate) {
		this.decorations = this.matchDecorator.updateDeco(update, this.decorations); // updates the decoration set
	}

	destroy() {}

	// This MatchDecorator takes the regex to match on and a decoration to add when matched
	matchDecorator = new MatchDecorator({
		regexp: /\(\(t(\w)+]]/g, //TODO: Replace this simple regexp with the default regex
		decoration: (match) => { // `match` is the result of `regexp.exec`
			// TODO: I would like some verbose logging here, specifically a debug log
			return Decoration.replace({
				widget: new MatchWidget(match[1]), // The second element in `match` is the first capture group
			});
		},
	});
}

const pluginSpec: PluginSpec<ConcealViewPlugin> = {
	decorations: (value: ConcealViewPlugin) => value.decorations,
};

// concealViewPlugin is the main export for this class
// and is used to register the editorExtension in main.ts
export const concealViewPlugin = ViewPlugin.fromClass(
	ConcealViewPlugin,
	pluginSpec,
);


