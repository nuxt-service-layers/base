export {}

declare global {
	interface ServiceConfig {
		database: "firestore" | "postgres" | "sqlite" | "mongo"
	}
}
