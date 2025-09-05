import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "./api-client"
import type { GetClienteCulturasAPIResponse } from "./types/get-cliente-culturas-response"

export function useClienteCulturas(cliente_id: string) {
	return useQuery({
		queryKey: ["get-cliente-culturas", cliente_id],

		queryFn: async () => {
			const response = await apiFetch(
				`/usuarios/clientes/${cliente_id}/culturas`
			)

			if (!response.ok) {
				const errorData = await response.json().catch(() => null)
				throw new Error(
					errorData?.error || "Falha ao buscar culturas do cliente"
				)
			}

			return response.json() as Promise<GetClienteCulturasAPIResponse>
		},
		staleTime: 1000 * 60 * 5, // 5 minutos
		retry: 1,
		enabled: !!cliente_id,
	})
}
