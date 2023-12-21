import { DecorationSet, MatchDecorator, ViewUpdate } from '@codemirror/view';

export class ConcealMatchDecorator extends MatchDecorator {
	private lastSelectionFrom: number;
	private lastSelectionTo: number;

	updateDeco(update: ViewUpdate, deco: DecorationSet) {
		let updateFrom;
		let updateTo;

		if (update.docChanged) {
			({ updateFrom, updateTo } = this.updateChanges(update));
		} else if (update.selectionSet) {
			({ updateFrom, updateTo } = this.updateSelection(update));
		}

		if (updateTo && updateFrom && updateTo - updateFrom <= 1000) {
			return this['updateRange'](update.view, deco.map(update.changes), updateFrom, updateTo);
		} else if (update.viewportChanged) {
			return this.createDeco(update.view);
		}
		return deco;
	}

	private updateChanges(update: ViewUpdate) {
		let updateFrom = 1e9;
		let updateTo = -1;

		update.changes.iterChanges((_f, _t, from, to) => {
			if (to > update.view.viewport.from && from < update.view.viewport.to) {
				updateFrom = update.state.doc.lineAt(Math.min(from, updateFrom)).from;
				updateTo = update.state.doc.lineAt(Math.max(to, updateTo)).to;
			}
		});
		return { updateFrom, updateTo };
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
		let updateFrom = Math.min(lineFrom, this.lastSelectionFrom);
		let updateTo = Math.max(lineTo, this.lastSelectionTo);

		// Retain the current selected range for the next update
		this.lastSelectionFrom = lineFrom;
		this.lastSelectionTo = lineTo;

		return { updateFrom, updateTo };
	}
}
