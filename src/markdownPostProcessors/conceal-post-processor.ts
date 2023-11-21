const ELEMENTS_TO_PROCESS = 'p, li';
// The 'answer' capture group contains the content to keep
const REGEX_CURLY_MATCH =  /{{1,2}(?![\s{])(?:c?\d+(?::{1,2}|\|))?(?<answer>[^}]+)}{1,2}/gm
const REGEX_CURLY_REPLACEMENT = '$<answer>'

const conceal = (node: Text, regex: RegExp, replacement: string) => {
	node.textContent = (node.textContent || '').replace(regex, replacement)
}

// TODO: while it is perfectly fine to us a function defintition 
//			 I'd prefer to creat a class implementation of the 
//			 Fucntional Interface `MarkDownPostProcessor` and implement
//			 this method within it. By doing so, the code will be better
//			 self documented.
// markdownPostProcessor manipulates the DOM of
// read mode to conceal clozure syntax
export function concealPostProcessor(htmlElement: HTMLElement) {
	const elements = htmlElement.querySelectorAll(ELEMENTS_TO_PROCESS)
	
	// Loop through each element
	elements.forEach((element: HTMLParagraphElement | HTMLLIElement) => {
		// TODO: Test the REGEX_CURLY_MATCH for post processing here:
		for (const node of Array.from(element.childNodes)) {
			// We grab the node so as to not destroy child elements when replacing innerText
			if (node.instanceOf(Text)) {
				const content = (node.textContent || '').trim()
				if (!content) continue

				conceal(node, REGEX_CURLY_MATCH, REGEX_CURLY_REPLACEMENT)
			}
		}
	})
}
