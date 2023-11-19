import { App, Editor, MarkdownView, Modal, Notice, Plugin } from "obsidian";
import { PluginSettings } from "./interfaces/pluginSettings";
import { SettingsTab } from "./settingsTab";
import { Decoration, PluginValue, ViewPlugin } from "@codemirror/view";
import { markdownPostProcessor } from "./markdownPostProcessor";
import { ConcealViewPlugin } from "./editorExtension";
import { Extension } from "@codemirror/state";

// Settings
// TODO: Add Settings
const DEFAULT_SETTINGS: PluginSettings = {
	mySetting: "default",
};

// TODO: Add Resources
export default class ObsidianToAnkiClozureConcealPlugin extends Plugin {
	settings: PluginSettings;
	editorExtensions: Extension = ViewPlugin.fromClass(ConcealViewPlugin);

	// Configures resources need by the plugin
	async onload() {
		await this.loadSettings();
		console.log("Loading Obsidian To Anki Clozure Conceal Plugin");

		this.registerMarkdownPostProcessor(markdownPostProcessor);
		this.registerEditorExtension(this.editorExtensions);
	}

	// Releases any resources configured by the plugin
	onunload() {
		console.log("Unloading Obsidian To Anki Clozure Conceal Plugin");
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
		contentEl.setText("Woah!");
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
