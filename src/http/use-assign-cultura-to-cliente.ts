import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import Toast from "react-native-toast-message"
import { apiFetch } from "./api-client"

export type AssignCulturaPayload = {
	cultura_id: number
	data_inicio: string
	data_fim: string
}

export function useAssignCulturaToCliente(cliente_id: string) {
	const queryClient = useQueryClient()
	const router = useRouter()

	return useMutation({
		mutationFn: async (data: AssignCulturaPayload) => {
			const response = await apiFetch(
				`/usuarios/clientes/${cliente_id}/culturas`,
				{
					method: "POST",
					body: JSON.stringify({
						cultura_id: data.cultura_id,
						data_inicio: data.data_inicio,
						data_fim: data.data_fim,
					}),
				}
			)

			if (!response.ok) {
				const errorData = await response.json().catch(() => null)
				throw new Error(
					errorData?.error || "Falha ao atribuir cultura ao cliente"
				)
			}

			return response.json()
		},

		onSuccess: () => {
			// Invalidate both cliente and cliente-culturas queries
			queryClient.invalidateQueries({
				queryKey: ["get-cliente-culturas"],
			})

			Toast.show({
				type: "success",
				text1: "Sucesso",
				text2: "Cultura atribuída com sucesso",
				autoHide: true,
				visibilityTime: 3000,
			})

			// Navigate back
			router.back()
		},

		onError: (error: Error) => {
			Toast.show({
				type: "error",
				text1: "Erro",
				text2: error.message,
				autoHide: true,
				visibilityTime: 3000,
			})
		},
	})
}
