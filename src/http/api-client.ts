import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native"

export const authManager = {
	// biome-ignore lint/suspicious/noEmptyBlockStatements: a função vazia chama a verdadeira função de logout do auth-context através de um UseEffect que escuta quando essa função e chamada
	logout: () => {},
}

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

async function UpdateTokens(): Promise<string | null> {
	const refreshToken = await AsyncStorage.getItem("refresh_token")
	if (!refreshToken) {
		Alert.alert("Sua sessão expirou. Por favor, faça o login novamente.")
		authManager.logout()
		return null
	}

	try {
		const response = await fetch(`${BASE_URL}/auth/refresh`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refresh_token: refreshToken }),
		})

		if (!response.ok) {
			Alert.alert("Sua sessão expirou. Por favor, faça o login novamente.")
			authManager.logout()
			return null
		}

		const newTokens = await response.json()

		await AsyncStorage.setItem("access_token", newTokens.access_token)
		await AsyncStorage.setItem("refresh_token", newTokens.refresh_token)

		return newTokens.access_token
	} catch (_error) {
		Alert.alert("Sua sessão expirou. Por favor, faça o login novamente.")
		authManager.logout()
		return null
	}
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
	const accessToken = await AsyncStorage.getItem("access_token")

	let response = await fetch(`${BASE_URL}${endpoint}`, {
		...options,
		headers: {
			...options.headers,
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	})

	if (response.status === 401) {
		const newAccessToken = await UpdateTokens()

		if (newAccessToken) {
			response = await fetch(`${BASE_URL}${endpoint}`, {
				...options,
				headers: {
					...options.headers,
					"Content-Type": "application/json",
					Authorization: `Bearer ${newAccessToken}`,
				},
			})
		} else {
			throw new Error("Sessão expirada. Por favor, faça login novamente.")
		}
	}

	return response
}
