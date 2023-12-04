import { MarkdownPostProcessor } from 'obsidian';

export class ConcealPostProcessor {
	private readonly ELEMENTS_TO_PROCESS = 'p, li';
	private readonly REGEX_CURLY_REPLACEMENT = '$<answer>'; // first capture group; content is not concealed

	constructor(public regexp: RegExp) {}

	private conceal = (node: Text, regex: RegExp, replacement: string) => {
		node.textContent = (node.textContent || '').replace(regex, replacement);
	};

	// markdownPostProcessor manipulates the DOM of
	// read mode to conceal clozure syntax
	process: MarkdownPostProcessor = (htmlElement: HTMLElement): void => {
		const elements = htmlElement.querySelectorAll(this.ELEMENTS_TO_PROCESS);

		// Loop through each element
		elements.forEach((element: HTMLParagraphElement | HTMLLIElement) => {
			// TODO: Test the REGEX_CURLY_MATCH for post processing here:
			for (const node of Array.from(element.childNodes)) {
				// We grab the node so as to not destroy child elements when replacing innerText
				if (node.instanceOf(Text)) {
					const content = (node.textContent || '').trim();
					if (!content) continue;

					this.conceal(node, this.regexp, this.REGEX_CURLY_REPLACEMENT);
				}
			}
		});
	};
}
