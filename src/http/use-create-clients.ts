import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import Toast from "react-native-toast-message"
import { apiFetch } from "./api-client"
import type { CreateClientAPIRequest } from "./types/create-client-request"

const createClient = async (data: CreateClientAPIRequest) => {
	const response = await apiFetch("/usuarios/clientes", {
		method: "POST",
		body: JSON.stringify(data),
	})

	if (!response.ok) {
		throw new Error(
			response.status === 409
				? "Cliente com o e-mail informado já existe"
				: "Erro ao cadastrar cliente"
		)
	}

	return response.json()
}

export function useCreateClient() {
	const queryClient = useQueryClient()
	const router = useRouter()

	return useMutation({
		mutationFn: createClient,
		onError: (error: Error) => {
			Toast.show({
				type: "error",
				text1: "Falha",
				text2: error.message,
				autoHide: true,
				visibilityTime: 3000,
			})
			router.replace("/home")
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["get-clients"] })
			Toast.show({
				type: "success",
				text1: "Sucesso",
				text2: "Cliente cadastrado",
				autoHide: true,
				visibilityTime: 3000,
			})
			router.replace("/home")
		},
	})
}
