import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "./api-client"
import type { GetFazendaAPIResponse } from "./types/get-fazenda-response"

export function useFazenda(fazenda_id: number) {
	return useQuery({
		queryKey: ["get-fazenda-by-id", fazenda_id],

		queryFn: async () => {
			const response = await apiFetch(`/fazendas/${fazenda_id}/sedes`)

			if (!response.ok) {
				const errorData = await response.json().catch(() => null)
				throw new Error(errorData?.error || "Falha ao buscar dados do cliente")
			}

			const data: GetFazendaAPIResponse = await response.json()
			return data
		},

		staleTime: 1000 * 60 * 60,
		retry: 1,
		enabled: !!fazenda_id,
	})
}
