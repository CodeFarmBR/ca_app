import { useQuery } from "@tanstack/react-query"
import type { GetClientesAPIResponse } from "./types/get-clientes-response"

export function UseCliente() {
	const apiURL = process.env.EXPO_PUBLIC_API_URL

	return useQuery({
		queryKey: ["get-clientes"],
		queryFn: async () => {
			const response = await fetch(`${apiURL}/usuarios/clientes`)
			if (!response.ok) {
				throw new Error("Falha ao buscar clientes")
			}
			const result: GetClientesAPIResponse = await response.json()

			return result
		},
	})
}
