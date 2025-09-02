import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import Toast from "react-native-toast-message"
import { apiFetch } from "./api-client"
import type { CreateFazendaAPIRequest } from "./types/create-fazenda-request"

const createFazenda = async (data: CreateFazendaAPIRequest) => {
	const response = await apiFetch("/fazendas", {
		method: "POST",
		body: JSON.stringify(data),
	})

	if (!response.ok) {
		throw new Error(
			response.status === 409
				? "Dado(s) de cadastro não encontrado(s)"
				: "Erro ao cadastrar fazenda"
		)
	}

	return response.json()
}

export function useCreateFazenda() {
	const queryClient = useQueryClient()
	const router = useRouter()

	return useMutation({
		mutationFn: createFazenda,
		onError: (error: Error) => {
			Toast.show({
				type: "error",
				text1: "Falha",
				text2: error.message,
				autoHide: true,
				visibilityTime: 3000,
			})
			router.back()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["get-fazendas"] })
			Toast.show({
				type: "success",
				text1: "Sucesso",
				text2: "Fazenda cadastrada",
				autoHide: true,
				visibilityTime: 3000,
			})
			router.back()
		},
	})
}
