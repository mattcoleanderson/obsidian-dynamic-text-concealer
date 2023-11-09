import { App, Editor, MarkdownView, Modal, Notice, Plugin } from 'obsidian';
import { PluginSettings } from './interfaces/pluginSettings';
import { SettingsTab } from './settingsTab';
import { Decoration } from '@codemirror/view';
import { markdownPostProcessor } from './markdownPostProcessor';

// Settings 
// TODO: Add Settings
const DEFAULT_SETTINGS: PluginSettings = {
	mySetting: 'default'
}

// TODO: Add Resources
export default class ObsidianToAnkiClozureConcealPlugin extends Plugin {
	settings: PluginSettings;


	// Configures resources need by the plugin
	async onload() {
		await this.loadSettings();
		console.log('Loading Obsidian To Anki Clozure Conceal Plugin')

		this.registerMarkdownPostProcessor(markdownPostProcessor)
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

