import { App, Editor, editorEditorField, MarkdownView, Modal, Notice, Plugin } from 'obsidian';
import { PluginSettings } from './interfaces/plugin-settings';
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

export default class ConcealPlugin extends Plugin {
	settings: PluginSettings;
	editorExtensions: Extension = concealViewPlugin; // TODO: Don't hardcode this. Instead, this should be a List of Extensions updated by a function

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async onload() {
		await this.loadSettings();
		console.log('Loading Obsidian Conceal Plugin');

		this.registerMarkdownPostProcessor(concealPostProcessor);
		this.registerEditorExtension([this.editorExtensions]);

		// TODO: Add obsidian typing for EditorView to Editor
		// See :
		//	- https://docs.obsidian.md/Plugins/Editor/Communicating+with+editor+extensions
		//	- https://github.com/blacksmithgu/obsidian-dataview/pull/2088/files
		this.registerEvent(
			this.app.workspace.on('layout-change', () => {
				this.app.workspace.iterateAllLeaves((leaf) => {
					if (
						leaf.view instanceof MarkdownView &&
						// @ts-expect-error, not typed
						(leaf.view.editor.cm as EditorView)
					) {
						// @ts-expect-error, not typed
						const cm = leaf.view.editor.cm as EditorView;
						cm.dispatch({
							effects: workspaceLayoutChangeEffect.of(null),
						});
					}
				});
			}),
		);

		this.addSettingTab(new SettingsTab(this.app, this));
	}

	// Releases any resources configured by the plugin
	onunload() {
		console.log('Unloading Obsidian Conceal Plugin');
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
