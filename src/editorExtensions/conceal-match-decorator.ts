import { DecorationSet, MatchDecorator, ViewUpdate } from '@codemirror/view';

export class ConcealMatchDecorator extends MatchDecorator {
	lastSelectionFrom: number;
	lastSelectionTo: number;

	updateDeco(update: ViewUpdate, deco: DecorationSet) {
		let changeFrom = 1e9;
		let changeTo = -1;

		if (update.docChanged) {
			update.changes.iterChanges((_f, _t, from, to) => {
				if (to > update.view.viewport.from && from < update.view.viewport.to) {
					changeFrom = Math.min(from, changeFrom);
					changeTo = Math.max(to, changeTo);
				}
			});
		} else if (update.selectionSet) {
			({ changeFrom, changeTo } = this.updateSelection(update));
		}

		if (changeTo > -1 && changeTo - changeFrom <= 1000) {
			return this['updateRange'](
				update.view,
				deco.map(update.changes),
				changeFrom,
				changeTo,
			);
		} else if (update.viewportChanged) {
			return this.createDeco(update.view);
		}
		return deco;
	}

	/*
	 * updateSelection returns a range to update when a selection has been made
	 * to the document, suchas a moving the cursor of selecting multiple character and line
	 */
	private updateSelection(update: ViewUpdate) {
		const selection = update.state.selection.ranges;

		// Get the earliest and latest positon of the lines in the selected range
		let lineFrom = update.state.doc.lineAt(selection[0].from).from;
		let lineTo = update.state.doc.lineAt(selection[selection.length - 1].to).to;

		// Return the earliest and latest postions of the current and previous selection range
		let changeFrom = Math.min(lineFrom, this.lastSelectionFrom);
		let changeTo = Math.max(lineTo, this.lastSelectionTo);

		// Retain the current selected range for the next update
		this.lastSelectionFrom = lineFrom;
		this.lastSelectionTo = lineTo;

		return { changeFrom, changeTo };
	}
}
