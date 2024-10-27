/**
 * Checks if the correct env variables have been set. If not flag the user.
 * This is to be called at spinup of each layer.
 */
export function envError(variables: string[], layerName: string) {
	const missingKeys = variables.filter((key) => !process.env[key])

	if (missingKeys.length) {
		let errorString = `[firebase] You are missing the database connection details:\n\n`
		missingKeys.forEach((key) => (errorString += `${key}=\n`))
		errorString +=
			"\n Please add these to your .env connect to firestore. NOTE: The .env should be in the root of your cwd()."

		console.warn(errorString)
		return true
	}

	return false
}
