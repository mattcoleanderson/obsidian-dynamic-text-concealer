import { MarkdownView, Plugin } from 'obsidian';
import { SettingsTab } from './settingsTab';
import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { concealViewPlugin, workspaceLayoutChangeEffect } from './editorExtensions/conceal-view-plugin';
import { ConcealPostProcessor } from './markdownPostProcessors/conceal-post-processor';
import { PluginSettings } from './interfaces/plugin-settings';

// Settings
const DEFAULT_SETTINGS: PluginSettings = {
	doConcealEditMode: true,
	regexp: ['({{1,2}(?![\\s{])(?:c?\\d+(?::{1,2}|\\|))?)(?:[^}]+)(}{1,2})'],
	enable: true,
};

export default class DynamicTextConcealPlugin extends Plugin {
	settings: PluginSettings;
	editorExtensions: Extension[] = [];

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	addEditorExtension() {
		this.editorExtensions.length = 0;
		if (this.settings.doConcealEditMode) {
			this.settings.regexp.forEach((regexString) => {
				if (!regexString) return; // skip if input is empty

				// Create regex expression from user settings
				// Note: the 'd' flag, enables regexpmatch indices for enabling clickable replacement text
				//			 see: https://github.com/tc39/proposal-regexp-match-indices?tab=readme-ov-file#motivations
				const regex = new RegExp(regexString, 'gmd');

				this.editorExtensions.push(concealViewPlugin(regex));
			});
		}
	}

	updateEditorExtension() {
		this.addEditorExtension();
		this.app.workspace.updateOptions();
	}

	addEvents() {
		if (this.settings.doConcealEditMode) {
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
		}
	}

	addMarkdownPostProcessor() {
		this.settings.regexp.forEach((regexString) => {
			const regex = new RegExp(regexString, 'gmd'); // create regex expression from user settings
			const concealPostProcessor = new ConcealPostProcessor(regex);
			this.registerMarkdownPostProcessor(concealPostProcessor.process);
		});
	}

	async onload() {
		await this.loadSettings();
		console.log('Loading Dynamic Text Conceal Plugin');

		this.addMarkdownPostProcessor();

		this.addEditorExtension();
		this.registerEditorExtension(this.editorExtensions);
		this.addEvents();

		this.addSettingTab(new SettingsTab(this.app, this));
	}

	// Releases any resources configured by the plugin
	onunload() {
		console.log('Unloading Dynamic Text Conceal Plugin...');
	}
}
