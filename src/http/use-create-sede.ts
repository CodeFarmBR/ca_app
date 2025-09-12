import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import Toast from "react-native-toast-message"
import { apiFetch } from "./api-client"
import type { CreateSedeAPIRequest } from "./types/create-sede-request"

type CreateSedeParams = CreateSedeAPIRequest & {
	fazenda_id: number
}

const createSede = async (data: CreateSedeParams) => {
	const { fazenda_id, ...requestData } = data
	const response = await apiFetch(`/fazendas/${fazenda_id}/sedes`, {
		method: "POST",
		body: JSON.stringify(requestData),
	})

	if (!response.ok) {
		const errorData = await response.json().catch(() => null)
		throw new Error(errorData?.error || "Falha ao cadastrar nova sede")
	}

	return response.json()
}

export function useCreateSede() {
	const queryClient = useQueryClient()
	const router = useRouter()

	return useMutation({
		mutationFn: createSede,
		onError: (error: Error) => {
			Toast.show({
				type: "error",
				text1: "Falha",
				text2: error.message,
			})
			router.back()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["get-fazenda-by-id"] })
			Toast.show({
				type: "success",
				text1: "Sucesso",
				text2: "Sede cadastrada",
			})
			router.back()
		},
	})
}
