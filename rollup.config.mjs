import typescript from '@rollup/plugin-typescript';

// TODO: Create environment specific builds (dev, prod, etc.)
// Dataview plugin has a good implementaiton of this
export default {
	input: 'src/main.ts',
	output: {
		file: 'out/main.js',
		format: 'es',
		sourcemap: 'inline'
	},
	plugins: [typescript()],
	external: ['obsidian', 'path']
};
