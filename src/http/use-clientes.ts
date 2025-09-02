import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "@/http/api-client" // 1. Importe sua nova função
import type { GetClientesAPIResponse } from "./types/get-clientes-response"

export function useClientes(consultoria_id?: number) {
	return useQuery({
		queryKey: ["get-clientes", consultoria_id],

		queryFn: async () => {
			const response = await apiFetch(
				`/consultorias/${consultoria_id}/clientes`
			)

			if (!response.ok) {
				const errorData = await response.json().catch(() => null)
				throw new Error(errorData?.error || "Falha ao buscar clientes")
			}

			return response.json() as Promise<GetClientesAPIResponse>
		},
		staleTime: 1000 * 60 * 5, // 5 minutos
		retry: 1, // Em caso de erro na resposta, tenta refazer a requisição mais uma vez (o padrão é 3)
		// Desabilita a query se não houver um ID.
		// Isso evita uma chamada de API desnecessária para uma URL inválida.
		enabled: !!consultoria_id,
	})
}
