import { App, PluginSettingTab, Setting } from 'obsidian';
import ConcealPlugin from './main';

export class SettingsTab extends PluginSettingTab {
	plugin: ConcealPlugin;

	constructor(app: App, plugin: ConcealPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	private arrayMove<T>(arr: T[], fromIndex: number, toIndex: number): void {
		if (toIndex < 0 || toIndex === arr.length) {
			return;
		}
		const element = arr[fromIndex];
		arr[fromIndex] = arr[toIndex];
		arr[toIndex] = element;
	}

	addRegexSettings() {
		let desc = document.createDocumentFragment();
		desc.append(
			'Custom Regex for specifying patterns to conceal/replace.',
			desc.createEl('br'),
			'Check the ',
			desc.createEl('a', {
				href: 'https://github.com/mattcoleanderson/obsidian-conceal-plugin/discussions/19',
				text: 'List of Community Made Regex',
			}),
			' Discussion for working examples. Feel free to add your own as well.',
		);
		new Setting(this.containerEl).setHeading().setName('Regular Expressions').setDesc(desc);

		this.plugin.settings.regexp.forEach((regex, index) => {
			const setting = new Setting(this.containerEl)
				.addText((text) => {
					text.setValue(regex).onChange((newRegex) => {
						if (newRegex && this.plugin.settings.regexp.contains(newRegex)) {
							// TODO: Log Error
							return;
						}
						this.plugin.settings.regexp[index] = newRegex;
						this.plugin.saveSettings();
						this.plugin.updateEditorExtension();
					});
				})
				.addExtraButton((button) => {
					button
						.setIcon('up-chevron-glyph')
						.setTooltip('Move up')
						.onClick(() => {
							console.log('Oh No!');
							this.arrayMove(this.plugin.settings.regexp, index, index - 1);
							this.plugin.saveSettings();
							this.display();
							this.plugin.updateEditorExtension();
						});
				})
				.addExtraButton((button) => {
					button
						.setIcon('down-chevron-glyph')
						.setTooltip('Move down')
						.onClick(() => {
							this.arrayMove(this.plugin.settings.regexp, index, index + 1);
							this.plugin.saveSettings();
							this.display();
							this.plugin.updateEditorExtension();
						});
				})
				.addExtraButton((button) => {
					button
						.setIcon('cross')
						.setTooltip('Delete')
						.onClick(() => {
							this.plugin.settings.regexp.splice(index, 1);
							this.plugin.saveSettings();
							this.plugin.updateEditorExtension();
							this.display();
						});
				});
			setting.infoEl.remove();
			setting.controlEl.firstElementChild?.addClass('conceal-regex-setting');
		});

		new Setting(this.containerEl).addButton((button) => {
			button
				.setButtonText('Add new regular expression')
				.setCta()
				.onClick(() => {
					this.plugin.settings.regexp.push('');
					this.plugin.saveSettings();
					this.display();
				});
		});
	}

	async display() {
		// This is the outtermost HTML element on the setting tab
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl('a', {
			text: 'For more information check the wiki',
			href: 'https://github.com/mattcoleanderson/obsidian-conceal-plugin/wiki',
		});

		// new Setting(containerEl)
		// 	.setName('Conceal in Editing Mode')
		// 	.setDesc(
		// 		`Matched text is concealed in editing mode (live preview),
		// 		 except when cursor or selection overlaps with matched text.`,
		// 	)
		// 	.addToggle((toggle) =>
		// 		toggle.setValue(this.plugin.settings.doConcealEditMode).onChange(async (value) => {
		// 			this.plugin.settings.doConcealEditMode = value;
		// 			await this.plugin.saveSettings();
		// 			this.plugin.updateEditorExtension();
		// 		}),
		// 	);

		// this.setupMatchTable();
		this.addRegexSettings();
	}
}
