import { App, PluginSettingTab, Setting } from "obsidian";
import ObsidianToAnkiClozureConcealPlugin from "./main";

export class SettingsTab extends PluginSettingTab {
	plugin: ObsidianToAnkiClozureConcealPlugin;

	constructor(app: App, plugin: ObsidianToAnkiClozureConcealPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	async display() {
		// This is the outtermost HTML element on the setting tab
		const {containerEl} = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}