// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	hooks: {
		ready: (nuxt) => {
			const layers = nuxt.options._layers || []
			console.log(
				"Nuxt Layers:",
				layers.map((layer) => layer.config.rootDir),
			)
		},
	},
})
