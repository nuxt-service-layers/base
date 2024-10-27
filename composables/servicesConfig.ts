export let $ServicesConfig: ServiceConfig

export async function defineServicesConfig(servicesConfig: ServiceConfig) {}

/**Provides use for the services.config after app build and on client side. */
export async function initServicesConfig() {
	$ServicesConfig = await $fetch<ServiceConfig>("/api/_config")
}
