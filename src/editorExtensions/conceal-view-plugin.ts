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
import { syntaxTree } from '@codemirror/language';

class ConcealViewPlugin implements PluginValue {
	decorations: DecorationSet; // list of current decorators in view
	matchDecorator: MatchDecorator; // Creates and updates decorators

	constructor(view: EditorView, regexp: RegExp) {
		this.matchDecorator = new ConcealMatchDecorator({
			regexp: regexp,
			decorate: (add, from, to, match, view): void => {
				// Define conditions where a decorator should not be added for a match
				if (this.isCodeblock(view, from, to)) return;
				if (this.selectionAndRangeOverlap(view.state.selection, from, to)) return;

				// Add decorator to replace match with the 'answer' capture group
				add(
					from,
					from + match[0].length,
					Decoration.replace({
						widget: new MatchWidget(match, view),
						inclusive: true,
					}),
				);
			},
		});

		// Initialize the DecoratorSet if not in source mode
		this.decorations = this.initializeDecorations(view);
	}

	/**
	 * isCodeblock returns true if the current current matches
	 * from and to position contains a code block
	 */
	private isCodeblock(view: EditorView, from: number, to: number): boolean {
		let isCodeblock = false;
		syntaxTree(view.state).iterate({
			from,
			to,
			enter: (node) => {
				if (node.name == 'inline-code' || node.name == 'HyperMD-codeblock_HyperMD-codeblock-bg') {
					isCodeblock = true;
					return false; // short circuit child iteration
				}
			},
		});
		return isCodeblock;
	}

	/**
	 * selectionAndRangeOverlap returns true if the specified range
	 * overlaps with the current cursor location or selection range
	 */
	private selectionAndRangeOverlap(selection: EditorSelection, rangeFrom: number, rangeTo: number): boolean {
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
		return view.state.field(editorLivePreviewField) ? this.matchDecorator.createDeco(view) : Decoration.none;
	}
}

const pluginSpec: PluginSpec<ConcealViewPlugin> = {
	decorations: (instance: ConcealViewPlugin) => instance.decorations,
};

/**
 * concealViewPlugin creates a ViewPlugin to be registers as an editorExtension
 */
export const concealViewPlugin = (regexp: RegExp) => {
	return ViewPlugin.define((view) => new ConcealViewPlugin(view, regexp), pluginSpec);
};

/**
 * A state effect that represents the workspace's layout change.
 * Mainly intended to detect when the user switches between live preview and source mode.
 */
export const workspaceLayoutChangeEffect = StateEffect.define<null>();
