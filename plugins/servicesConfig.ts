export default defineNuxtPlugin(async (nuxt) => {
	if (import.meta.server) return
	initServicesConfig()
})
