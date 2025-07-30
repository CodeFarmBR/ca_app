import { useMutation } from "@tanstack/react-query"
import { apiFetch } from "./api-client"
import type { CreateClientAPIRequest } from "./types/create-client-request"
import type { CreateClientAPIResponse } from "./types/create-client-response"

export function useCreateClient() {
	return useMutation({
		mutationKey: ["add-clients"],

		mutationFn: async (data: CreateClientAPIRequest) => {
			const requestOptions = {
				method: "POST",
				body: JSON.stringify(data),
			}
			const response = await apiFetch("/usuarios/clientes", requestOptions)

			if (!response.ok) {
				const errorData = await response.json().catch(() => null)
				throw new Error(errorData?.error || "Falha ao criar cliente")
			}

			const result: CreateClientAPIResponse = await response.json()
			return result
		},
	})
}
