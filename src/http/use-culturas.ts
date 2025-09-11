import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@/context/auth-context"
import { apiFetch } from "@/http/api-client"
import type { GetCulturasAPIResponse } from "./types/get-culturas-response"

export function useCulturas() {
	const { profile } = useAuth()
	const consultoriaId = profile?.consultoria_id
	return useQuery({
		queryKey: ["get-culturas", consultoriaId],

		queryFn: async () => {
			const response = await apiFetch(`/consultorias/${consultoriaId}/culturas`)

			if (!response.ok) {
				const errorData = await response.json().catch(() => null)
				throw new Error(errorData?.error || "Falha ao buscar culturas")
			}

			return response.json() as Promise<GetCulturasAPIResponse>
		},

		retry: 1,

		// Desabilita a query se não houver um ID.
		// Isso evita uma chamada de API desnecessária para uma URL inválida.
		enabled: !!consultoriaId,
	})
}
