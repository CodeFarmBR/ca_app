import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import Toast from "react-native-toast-message"
import { apiFetch } from "./api-client"
import type { CreateClienteAPIRequest } from "./types/create-cliente-request"

const createCliente = async (data: CreateClienteAPIRequest) => {
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

export function useCreateCliente() {
	const queryClient = useQueryClient()
	const router = useRouter()

	return useMutation({
		mutationFn: createCliente,
		onError: (error: Error) => {
			Toast.show({
				type: "error",
				text1: "Falha",
				text2: error.message,
				autoHide: true,
				visibilityTime: 3000,
			})
			router.replace("/(tabs)")
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["get-clientes"] })
			Toast.show({
				type: "success",
				text1: "Sucesso",
				text2: "Cliente cadastrado",
				autoHide: true,
				visibilityTime: 3000,
			})
			router.replace("/(tabs)")
		},
	})
}
