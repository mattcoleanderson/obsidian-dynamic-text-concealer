import { WidgetType } from "@codemirror/view";

// MatchWidget defines the properties of the DOM
// element used to replace a regex pattern match
export class MatchWidget extends WidgetType {
	// class name of replaced DOM element. Can be used for custom styling.
	readonly CLASS_NAME = "clozure-conceal"; // TODO: Figure out a better class name

	captureGroup: string; // The capture group of the matched regex. Used to replace text

	constructor(captureGroup: string) {
		super();
		this.captureGroup = captureGroup;
	}

	// TODO: More testing is needed to determine if the `span` is the best approach
	toDOM(): HTMLElement {
		const span = document.createElement("span");

		span.textContent = this.captureGroup;
		span.className = this.CLASS_NAME;

		return span;
	}
}
