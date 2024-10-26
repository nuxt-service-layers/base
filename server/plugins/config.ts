import fs from "fs"
import path from "path"
let configPath: string

if (import.meta.server) {
	configPath = path.join(process.cwd(), "services.config.ts")
}

// Get services.config and expose it to the client //
export default defineNitroPlugin(async (nitro) => {
	// Read the contents of the TypeScript file
	const configString = await fs.promises.readFile(configPath, "utf8")
	const configJsonString = configString.replace("defineServicesConfig(", "").trim().slice(0, -1)

	const validJsonString = configJsonString
		.replace(/,\s*}/g, "}") // Remove trailing commas before closing brace
		.replace(/([a-zA-Z0-9_]+):/g, '"$1":') // Convert keys to double-quoted strings

	const configJson = JSON.parse(validJsonString)

	nitro.hooks.hook("request", (event) => {
		event.context.servicesConfig = configJson
	})
})
