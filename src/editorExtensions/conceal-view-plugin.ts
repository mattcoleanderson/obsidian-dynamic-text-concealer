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
import { MatchWidget } from "./match-widget";

// TODO: Currently the replaced decorater isn't editable. This is undesirable and needs to be fixed.
// TODO: Stop this plugin from affecting source mode
// TODO: When in edit mode, the current line should show the conceal text.
class ConcealViewPlugin implements PluginValue {
	// TODO: Extract to the settings for the plugin for use throughout the project
	readonly REGEX_CURLY_MATCH = /{{1,2}(?![\s{])(?:c?\d+(?::{1,2}|\|))?(?<answer>[^}]+)}{1,2}/g;

	decorations: DecorationSet; // list of current decorators in view
	matchDecorator: MatchDecorator; // Creates and updates decorators

	constructor(view: EditorView) {
		this.matchDecorator = new MatchDecorator({
			regexp: this.REGEX_CURLY_MATCH,
			decoration: (match) => {
				// `match` is the result of `regexp.exec`
				// TODO: I would like some verbose logging here, specifically a debug log
				return Decoration.replace({
					widget: new MatchWidget(match[1]), // The second element in `match` is the first capture group
				});
			},
		});

		this.decorations = this.matchDecorator.createDeco(view); // createDeco creates the initial decoration set
	}

	update(update: ViewUpdate) {
		this.decorations = this.matchDecorator.updateDeco(update, this.decorations); // updates the decoration set
	}

	destroy() {}
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
