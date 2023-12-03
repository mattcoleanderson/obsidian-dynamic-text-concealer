import { App, PluginSettingTab, Setting } from 'obsidian';
import ConcealPlugin from './main';

export class SettingsTab extends PluginSettingTab {
	plugin: ConcealPlugin;

	constructor(app: App, plugin: ConcealPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	setupRegexp(headerRow: HTMLTableRowElement, bodyRow: HTMLTableRowElement) {
		// Table Header
		headerRow.createEl('th', { text: 'REGEXP' });
		// Table Body
		let cell = bodyRow.createEl('td');
		let setting = new Setting(cell).addText((text) =>
			text.setValue(this.plugin.settings.regexp).onChange(async (value) => {
				this.plugin.settings.regexp = value;
				await this.plugin.saveSettings();
			}),
		);
	}

	setupEnable(headerRow: HTMLTableRowElement, bodyRow: HTMLTableRowElement) {
		// Table Header
		headerRow.createEl('th', { text: 'Enable' });
		// Table Body
		let cell = bodyRow.createEl('td');
		let setting = new Setting(cell).addToggle((toggle) =>
			toggle.setValue(this.plugin.settings.enable).onChange(async (value) => {
				this.plugin.settings.enable = value;
				await this.plugin.saveSettings();
			}),
		);
	}

	setupMatchTable() {
		this.containerEl.createEl('h3', { text: 'Conceal Patterns' });
		this.containerEl.createEl('p', { text: 'Each row is a REGEX pattern for concealing matched text.' });

		// Table
		let matchTable = this.containerEl.createEl('table', { cls: 'conceal-settings-match-table' });
		// Table Header
		let headerRow = matchTable.createTHead().insertRow();
		// Table Body
		let tableBody = matchTable.createTBody();
		let bodyRow = tableBody.insertRow();

		this.setupRegexp(headerRow, bodyRow);
		this.setupEnable(headerRow, bodyRow);
	}

	async display() {
		// This is the outtermost HTML element on the setting tab
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl('h2', { text: 'Obsidian Conceal Plugin - Settings' });
		containerEl.createEl('a', {
			text: 'For more information check the wiki',
			href: 'https://github.com/mattcoleanderson/obsidian-conceal-plugin/wiki',
		});

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

		this.setupMatchTable();
	}
}
