export {}

declare global {
	interface ServiceConfig {
		database: "firebase" | "postgres" | "sqlite" | "mongo"
	}
}
