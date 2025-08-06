import { useQuery, useQueryClient } from "@tanstack/react-query"
import { apiFetch } from "./api-client"
import type { GetClienteAPIResponse } from "./types/get-cliente-response"

export function useCliente(cliente_id: string) {
	const queryClient = useQueryClient()

	return useQuery({
		queryKey: ["get-cliente-by-id", cliente_id],

		queryFn: async () => {
			const response = await apiFetch(`/usuarios/clientes/${cliente_id}`)

			if (!response.ok) {
				const errorData = await response.json().catch(() => null)
				throw new Error(errorData?.error || "Falha ao buscar dados do cliente")
			}

			return response.json() as Promise<GetClienteAPIResponse>
		},
		initialData: () => {
			return queryClient
				.getQueryData<GetClienteAPIResponse[]>(["get-clientes"])
				?.find((cliente) => cliente.usuario.usuario_id === cliente_id)
		},

		staleTime: 1000 * 60 * 5,
		retry: 1,
		enabled: !!cliente_id,
	})
}
