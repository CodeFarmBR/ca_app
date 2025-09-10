import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "./api-client"
import type { GetLavourasAPIResponse } from "./types/get-lavouras-responsa"

export function useLavouras(sede_id: number) {
	return useQuery({
		queryKey: ["get-lavouras-by-sede", sede_id],

		queryFn: async () => {
			const response = await apiFetch(`/sedes/${sede_id}/lavouras/`)

			if (!response.ok) {
				const errorData = await response.json().catch(() => null)
				throw new Error(errorData?.error || "Falha ao buscar dados da sede")
			}

			const data: GetLavourasAPIResponse = await response.json()

			return data
		},
		// staleTime: 1000 * 60 * 10,
		retry: 1,
		enabled: !!sede_id,
	})
}
