// modules/service-config.ts
import { defineNuxtModule } from "@nuxt/kit"
import fs from "fs"
import path from "path"

export default defineNuxtModule({
	async setup(_, nuxt) {
		try {
			// Resolve the path to `services.config.ts`
			const configPath = path.resolve(process.cwd(), "services.config.ts")
			const configString = await fs.promises.readFile(configPath, "utf8")

			const validJsonString = configString
				.replace("defineServicesConfig(", "")
				.trim()
				.slice(0, -1)
				.replace(/,\s*}/g, "}") // Remove trailing commas before closing brace
				.replace(/([a-zA-Z0-9_]+):/g, '"$1":') // Convert keys to double-quoted strings

			const configJson = JSON.parse(validJsonString)

			// Add to Nuxt's `runtimeConfig`
			nuxt.options.runtimeConfig.servicesConfig = configJson
		} catch (error) {
			console.log(error)
			console.warn("[service-config] Couldn't load `services.config.ts`:", error)
		}
	},
})

export function getServicesConfig(): ServiceConfig {
	const configPath = path.resolve(process.cwd(), "services.config.ts")

	try {
		const configString = fs.readFileSync(configPath, "utf8")

		const validJsonString = configString
			.replace("defineServicesConfig(", "")
			.trim()
			.slice(0, -1)
			.replace(/,\s*}/g, "}") // Remove trailing commas before closing brace
			.replace(/([a-zA-Z0-9_]+):/g, '"$1":') // Convert keys to double-quoted strings

		const configJson = JSON.parse(validJsonString)

		return configJson as ServiceConfig
	} catch (error: any) {
		if (error.code === "ENOENT") {
			console.warn(`Configuration file not found at: ${configPath}`)
			return {} as ServiceConfig
		} else {
			console.error("Error reading configuration file:", error)
			return {} as ServiceConfig
		}
	}
}
