import { useQuery } from "@tanstack/react-query"
import type { GetClientesAPIResponse } from "./types/get-clientes-response"

export function UseCliente(
	access_token: string | null,
	consultoria_id?: number
) {
	const apiURL = process.env.EXPO_PUBLIC_API_URL

	return useQuery({
		queryKey: ["get-clientes"],
		queryFn: async () => {
			const response = await fetch(
				`${apiURL}/consultorias/${consultoria_id}/clientes`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				}
			)
			if (!response.ok) {
				throw new Error("Falha ao buscar clientes")
			}
			const result: GetClientesAPIResponse = await response.json()

			return result
		},
	})
}
