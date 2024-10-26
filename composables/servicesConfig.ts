export let $ServicesConfig: ServiceConfig

export async function defineServicesConfig(servicesConfig: ServiceConfig) {}

export async function initServicesConfig() {
	$ServicesConfig = await $fetch<ServiceConfig>("/api/_config")
}
