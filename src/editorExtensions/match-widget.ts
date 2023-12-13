import { EditorView, WidgetType } from '@codemirror/view';

// MatchWidget defines the properties of the DOM
// element used to replace a regex pattern match
export class MatchWidget extends WidgetType {
	// class name of replaced DOM element. Can be used for custom styling.
	readonly CLASS_NAME = 'obsidian-conceal';

	constructor(
		public match: RegExpExecArray, // The capture group of the matched regex. Used to replace text
		public view: EditorView,
	) {
		super();
	}

	toDOM(): HTMLElement {
		const span = document.createElement('span');

		span.textContent = this.match[1];
		span.className = this.CLASS_NAME;

		this.addClickHandler(span);

		return span;
	}

	/*
	 * addClickHandler sets the cursor position relative to the clicked
	 * charcter. This approach is not perfect because font widths of
	 * characters vary
	 */
	addClickHandler(element: HTMLElement) {
		element.addEventListener('click', (event) => {
			if (event instanceof MouseEvent && this.match.indices) {
				const elementRect = element.getBoundingClientRect();

				const startPosition = this.view.posAtCoords(elementRect, false);

				// The starting index of the match and capture groups in the searched line
				const matchIndex = this.match.indices[0][0];
				const captureGroupIndex = this.match.indices[1][0];

				// The starting position of the capture group, relative to the document
				const captureGroupPostion = startPosition + (captureGroupIndex - matchIndex);
				// Position of event relative to the element as a percentage of the elements width (e.g. 10 - 5 / 10) = 0.5
				const relativePositionOfEvent = (event.x - elementRect.x) / elementRect.width;

				// The calculated postion of the click after adding concealed characters back to the document
				const clickedPosition = Math.round(captureGroupPostion + this.match[1].length * relativePositionOfEvent);

				this.view.dispatch({ selection: { anchor: clickedPosition } });
			}
		});
	}
}
