import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

const PROJECT_NAME = 'obsidian-dynamic-text-concealer';
const TEST_VAULT_PLUGIN_DIR = `test-vault/.obsidian/plugins/${PROJECT_NAME}`;
const BUILD_DIR = 'build';

const BASE_CONFIG = {
	input: 'src/main.ts',
	external: ['obsidian', '@codemirror/view', '@codemirror/state', '@codemirror/language'],
};

const getRollupPlugins = (...plugins) => [typescript(), nodeResolve({ browser: true }), commonjs()].concat(plugins);

const DEV_PLUGIN_CONFIG = {
	...BASE_CONFIG,
	output: {
		dir: TEST_VAULT_PLUGIN_DIR,
		sourcemap: 'inline',
		format: 'cjs',
		exports: 'auto',
	},
	plugins: getRollupPlugins(
		copy({
			targets: [
				{ src: 'manifest.json', dest: `${TEST_VAULT_PLUGIN_DIR}/` },
				{ src: 'styles.css', dest: `${TEST_VAULT_PLUGIN_DIR}/` },
			],
		}),
	),
};

const PROD_PLUGIN_CONFIG = {
	...BASE_CONFIG,
	output: {
		dir: BUILD_DIR,
		sourcemap: 'inline',
		sourcemapExcludeSources: true,
		format: 'cjs',
		exports: 'auto',
	},
	plugins: getRollupPlugins(),
};

// TODO: Create environment specific builds (dev, prod, etc.)
// Dataview plugin has a good implementaiton of this
let configs = [];
if (process.env.BUILD === 'prod') {
	// Production build
	configs.push(PROD_PLUGIN_CONFIG);
} else if (process.env.BUILD === 'dev') {
	// Dev build
	configs.push(DEV_PLUGIN_CONFIG);
} else {
	// Default to the dev build.
	configs.push(DEV_PLUGIN_CONFIG);
}

export default configs;
