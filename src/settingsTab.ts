import { App, PluginSettingTab, Setting } from 'obsidian';
import ConcealPlugin from './main';

export class SettingsTab extends PluginSettingTab {
	plugin: ConcealPlugin;

	constructor(app: App, plugin: ConcealPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	async display() {
		// This is the outtermost HTML element on the setting tab
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl('h2', { text: 'Obsidian Conceal Plugin - Settings' });

		new Setting(containerEl)
			.setName('Conceal in Editing Mode')
			.setDesc(
				`Matched text is concealed in editing mode (live preview),
				 except when cursor or selection overlaps with matched text.`,
			)
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.doConcealEditMode).onChange(async (value) => {
					this.plugin.settings.doConcealEditMode = value;
					await this.plugin.saveSettings();
					this.plugin.updateEditorExtension();
				}),
			);
	}
}
