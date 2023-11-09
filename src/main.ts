import { App, Editor, MarkdownView, Modal, Notice, Plugin } from 'obsidian';
import { PluginSettings } from './interfaces/pluginSettings';
import { SettingsTab } from './settingsTab';
import { Decoration } from '@codemirror/view';

// Settings 
// TODO: Add Settings
const DEFAULT_SETTINGS: PluginSettings = {
	mySetting: 'default'
}

// TODO: Add Resources
export default class ObsidianToAnkiClozureConcealPlugin extends Plugin {
	settings: PluginSettings;

	// TODO: Add other forms of clozures
	conceal = (node: Text) => {
		node.textContent = (node.textContent || '').replace(/{/, '')
	}

	// Configures resources need by the plugin
	async onload() {
		await this.loadSettings();
		console.log('Loading Obsidian To Anki Clozure Conceal Plugin')

		// TODO: Extract this lambda function to named function
		this.registerMarkdownPostProcessor((htmlElement) => {
			const elements = htmlElement.querySelectorAll('p, li') // TODO: Extract this string to a CONSTANT
			
			// Loop through each element
			elements.forEach((element: HTMLParagraphElement | HTMLLIElement) => {
				// TODO:	I would like to guarantee the element search is O(n)
				// As of right now the innerText will be search the whole string for each identifier
				if (!element.innerText.includes('{')) return // TODO: Extract this string to a CONSTANT and add support for '=='

				// From here forward we are working with an element that contains a clozure
				// Loop through each child node
				for (const node of Array.from(element.childNodes)) {
					// Handle different types of Elements that may be children

					// Text
					if (node.instanceOf(Text)) {
						const content = (node.textContent || '').trim()
						if (!content) continue // continue if content is empty

						this.conceal(node)
					}
				}
			})
		});
	}

	// Releases any resources configured by the plugin
	onunload() {
		console.log('Unloading Obsidian To Anki Clozure Conceal Plugin')

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

