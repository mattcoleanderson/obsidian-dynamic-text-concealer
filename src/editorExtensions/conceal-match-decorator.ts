import { DecorationSet, MatchDecorator, ViewUpdate } from '@codemirror/view';

export class ConcealMatchDecorator extends MatchDecorator {
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
			const selection = update.state.selection.ranges;
			let fromLineStart = update.state.doc.lineAt(selection[0].from).from;
			let toLineEnd = update.state.doc.lineAt(
				selection[selection.length - 1].to,
			).to;

			changeFrom = Math.min(fromLineStart, changeFrom);
			changeTo = Math.max(toLineEnd, changeTo);
		}

		if (
			(!update.docChanged && update.viewportChanged) ||
			changeTo - changeFrom > 1000
		) {
			return this.createDeco(update.view);
		}
		if (changeTo > -1) {
			return this['updateRange'](
				update.view,
				deco.map(update.changes),
				changeFrom,
				changeTo,
			);
		}
		return deco;
	}
}
