import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "@/http/api-client"
import type { GetCulturasAPIResponse } from "./types/get-culturas-response"

export function useCulturas(consultoria_id?: number) {
	return useQuery({
		queryKey: ["get-culturas", consultoria_id],

		queryFn: async () => {
			const response = await apiFetch(
				`/consultorias/${consultoria_id}/culturas`
			)

			if (!response.ok) {
				const errorData = await response.json().catch(() => null)
				throw new Error(errorData?.error || "Falha ao buscar culturas")
			}

			return response.json() as Promise<GetCulturasAPIResponse>
		},

		// Desabilita a query se não houver um ID.
		// Isso evita uma chamada de API desnecessária para uma URL inválida.
		enabled: !!consultoria_id,
	})
}
