import { MarkdownPostProcessor } from 'obsidian';

export class ConcealPostProcessor {
	private readonly ELEMENTS_TO_PROCESS = 'p, li';
	private readonly REGEX_CURLY_REPLACEMENT = '$<answer>'; // first capture group; content is not concealed

	constructor(public regexp: RegExp) {}

	private conceal = (element: HTMLParagraphElement | HTMLLIElement) => {
		// InnterHTML is the only way to preserve element tags during the regex matches.
		// However, since the replaced text is a capture group, only text in the document itself can cause a replacement
		element.innerHTML = element.innerHTML.replace(this.regexp, this.REGEX_CURLY_REPLACEMENT);
	};

	// markdownPostProcessor manipulates the DOM of
	// read mode to conceal clozure syntax
	process: MarkdownPostProcessor = (htmlElement: HTMLElement): void => {
		const elements = htmlElement.querySelectorAll(this.ELEMENTS_TO_PROCESS);

		// Loop through each element
		elements.forEach((element: HTMLParagraphElement | HTMLLIElement) => {
			this.conceal(element);
		});
	};
}
