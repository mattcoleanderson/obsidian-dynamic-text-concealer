const ELEMENTS_TO_PROCESS = 'p, li';

const conceal = (node: Text) => {
	node.textContent = (node.textContent || '').replace(/{/, '')
}

// markdownPostProcessor manipulates the DOM of
// read mode to conceal clozure syntax
export function markdownPostProcessor(htmlElement: HTMLElement) {
	const elements = htmlElement.querySelectorAll(ELEMENTS_TO_PROCESS)
	
	// Loop through each element
	elements.forEach((element: HTMLParagraphElement | HTMLLIElement) => {
		// if (!element.innerText.includes('{') || !element.innerText.includes('==')) return
		if (!element.innerText.match(/{|==/)) return

		// From here forward we are working with an element that contains a clozure
		// Loop through each child node
		for (const node of Array.from(element.childNodes)) {
			// Handle different types of Elements that may be children

			// Text
			if (node.instanceOf(Text)) {
				const content = (node.textContent || '').trim()
				if (!content) continue // continue if content is empty

				conceal(node)
			}
		}
	})
}
