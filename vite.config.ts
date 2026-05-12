import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	build: {
		modulePreload: true,
		rolldownOptions: {
			output: {
				codeSplitting: {
					groups: [
						{name: 'vue-bundle', test: /node_modules\/(vue|vue-router|pinia)/},
						{name: 'libs', test: /src\/lib/},
						{name: 'router', test: /src\/router/},
					]
				}
			}
		}
	},
	resolve: {
		alias: {
			'@': '/src',
		}
	},
	plugins: [vue(), tailwindcss()],
});
