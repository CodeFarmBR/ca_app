import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import Toast from "react-native-toast-message"
import { apiFetch } from "./api-client"
import type { AssignCulturaToClienteAPIRequest } from "./types/assign-cultura-to-cliente-request"

type AssignCulturaParams = AssignCulturaToClienteAPIRequest & {
	cliente_id: string | number
}

const assignCulturaToCliente = async (data: AssignCulturaParams) => {
	const { cliente_id, ...requestData } = data

	const response = await apiFetch(`/usuarios/clientes/${cliente_id}/culturas`, {
		method: "POST",
		body: JSON.stringify(requestData),
	})

	if (!response.ok) {
		const errorData = await response.json().catch(() => null)
		throw new Error(errorData.error || "Falha ao atribuir cultura ao cliente")
	}

	return response.json()
}

export function useAssignCulturaToCliente() {
	const queryClient = useQueryClient()
	const router = useRouter()

	return useMutation({
		mutationFn: assignCulturaToCliente,
		onError: (error: Error) => {
			Toast.show({
				type: "error",
				text1: "Falha",
				text2: error.message,
				autoHide: true,
				visibilityTime: 5000,
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["get-cliente-culturas"] })
			Toast.show({
				type: "success",
				text1: "Sucesso",
				text2: "Cultura atribuída",
				autoHide: true,
				visibilityTime: 3000,
			})
			router.back()
		},
	})
}
