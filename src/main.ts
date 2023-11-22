import { App, Editor, editorEditorField, MarkdownView, Modal, Notice, Plugin } from 'obsidian';
import { PluginSettings } from './interfaces/pluginSettings';
import { SettingsTab } from './settingsTab';
import { Decoration, EditorView, PluginValue, ViewPlugin } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { concealViewPlugin, workspaceLayoutChangeEffect } from './editorExtensions/conceal-view-plugin';
import { concealPostProcessor } from './markdownPostProcessors/conceal-post-processor';

// Settings
// TODO: Add Settings
const DEFAULT_SETTINGS: PluginSettings = {
	mySetting: 'default',
};

export default class ObsidianToAnkiClozureConcealPlugin extends Plugin {
	settings: PluginSettings;
	editorExtensions: Extension = concealViewPlugin; // TODO: Don't hardcode this. Instead, this should be a List of Extensions updated by a function

	async onload() {
		await this.loadSettings();
		console.log('Loading Obsidian To Anki Clozure Conceal Plugin');

		this.registerMarkdownPostProcessor(concealPostProcessor);

		this.registerEditorExtension([this.editorExtensions]);
	}

	// Releases any resources configured by the plugin
	onunload() {
		console.log('Unloading Obsidian To Anki Clozure Conceal Plugin');
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
		const { contentEl } = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
