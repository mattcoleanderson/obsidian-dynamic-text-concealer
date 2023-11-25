import { EditorSelection, StateEffect } from '@codemirror/state';
import {
	Decoration,
	DecorationSet,
	EditorView,
	MatchDecorator,
	PluginSpec,
	PluginValue,
	ViewPlugin,
	ViewUpdate,
} from '@codemirror/view';
import { editorLivePreviewField } from 'obsidian';
import { ConcealMatchDecorator } from './conceal-match-decorator';
import { MatchWidget } from './match-widget';

// TODO: Currently the replaced decorater isn't editable. This is undesirable and needs to be fixed.
// TODO: When in edit mode, the current line should show the conceal text.
class ConcealViewPlugin implements PluginValue {
	// TODO: Extract to the settings for the plugin for use throughout the project
	readonly REGEX_CURLY_MATCH =
		/{{1,2}(?![\s{])(?:c?\d+(?::{1,2}|\|))?(?<answer>[^}]+)}{1,2}/g;

	decorations: DecorationSet; // list of current decorators in view
	matchDecorator: MatchDecorator; // Creates and updates decorators

	constructor(view: EditorView) {
		this.matchDecorator = new ConcealMatchDecorator({
			regexp: this.REGEX_CURLY_MATCH,
			// decoration: (match): Decoration => {
			// 	// `match` is the result of `regexp.exec`
			// 	// TODO: I would like some verbose logging here, specifically a debug log
			// 	return Decoration.replace({
			// 		widget: new MatchWidget(match[1]), // The second element in `match` is the first capture group
			// 	});
			// },
			decorate: (add, from, to, match, view): void => {
				// Current location of cursor or selected range
				const selection = view.state.selection;
				// Replace match if not overlapping with the cursor
				if (!this.selectionAndRangeOverlap(selection, from, to)) {
					// Add Replace Decoration to DecorationSet. The First caputre group will replace the match
					add(
						from,
						from + match[0].length,
						Decoration.replace({
							widget: new MatchWidget(match[1]),
						}),
					);
				}
			},
		});

		// Initialize the DecoratorSet if not in source mode
		this.decorations = this.initializeDecorations(view);
	}

	/**
	 * selectionAndRangeOverlap returns true if the specified range
	 * ovlaps with the current cursor location or selection range
	 */
	private selectionAndRangeOverlap(
		selection: EditorSelection,
		rangeFrom: number,
		rangeTo: number,
	) {
		for (const range of selection.ranges) {
			if (range.from <= rangeTo && range.to >= rangeFrom) {
				return true;
			}
		}
		return false;
	}
	update(update: ViewUpdate) {
		const isSourceMode = !update.state.field(editorLivePreviewField);
		// TODO: Make this a state field
		const isEditorLayoutChanged = update.transactions.some((t) =>
			t.effects.some((e) => e.is(workspaceLayoutChangeEffect)),
		);

		// Reinitialize Decorations if sourc mode or recetly switch back to Live Preview
		if (isSourceMode || isEditorLayoutChanged) {
			this.decorations = this.initializeDecorations(update.view);
			return;
		}

		// Update DecorationSet with MatchDecorator
		this.decorations = this.matchDecorator.updateDeco(update, this.decorations);
	}

	destroy() {}

	/**
	 * Initializes DecorationSet. Is disabled if the editor is in source mode.
	 */
	private initializeDecorations(view: EditorView): DecorationSet {
		return view.state.field(editorLivePreviewField) ?
				this.matchDecorator.createDeco(view)
			:	Decoration.none;
	}
}

const pluginSpec: PluginSpec<ConcealViewPlugin> = {
	decorations: (instance: ConcealViewPlugin) => instance.decorations,
};

// concealViewPlugin is the main export for this class
// and is used to register the editorExtension in main.ts
export const concealViewPlugin = ViewPlugin.fromClass(
	ConcealViewPlugin,
	pluginSpec,
);

/**
 * A state effect that represents the workspace's layout change.
 * Mainly intended to detect when the user switches between live preview and source mode.
 */
export const workspaceLayoutChangeEffect = StateEffect.define<null>();
