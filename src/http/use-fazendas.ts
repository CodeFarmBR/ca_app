import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "./api-client"
import type { GetFazendasAPIResponse } from "./types/get-fazendas-response"

export function useFazendas(cliente_id: string) {
	return useQuery({
		queryKey: ["get-fazendas", cliente_id],

		queryFn: async () => {
			const response = await apiFetch(
				`/usuarios/clientes/${cliente_id}/fazendas`
			)

			if (!response.ok) {
				const errorData = await response.json().catch(() => null)
				throw new Error(errorData?.error || "Falha ao buscar fazendas")
			}

			return response.json() as Promise<GetFazendasAPIResponse>
		},
		staleTime: 1000 * 60 * 5, // 5 minutos
		retry: 1,
		enabled: !!cliente_id,
	})
}
