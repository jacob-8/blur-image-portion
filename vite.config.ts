import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { SvelteScopedUno } from 'svelte-scoped-uno';

export default defineConfig({
	plugins: [
		SvelteScopedUno(
			{ addReset: 'tailwind' }
		),
		sveltekit()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
