// vite.config.js
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default {
	plugins: [vue()],
	resolve: {
		alias: {
			'@': '/src',
			'@pages': '/src/pages'
		}
	},
	build: {
		modulePreload: true,
		rolldownOptions: {
			output: {
				codeSplitting: {
					groups: [
						{ name: 'chunks', test: /src\/router\/index.js/ },
						{ name: 'vue', test: /node_modules\/vue/ },
						{ name: 'vue-router', test: /node_modules\/vue-router/ },
						{ name: 'jsonc', test: /node_modules\/jsonc-parser/ }
					]
				}
			}
		}
	}
};
