import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import Toast from "react-native-toast-message"
import { useAuth } from "@/context/auth-context"
import { apiFetch } from "./api-client"
import type { CreateCulturaAPIRequest } from "./types/create-cultura-request"

// Update the function signature to make consultoria_id optional in the request
const createCultura = async (
	data: Omit<CreateCulturaAPIRequest, "consultoria_id"> & {
		consultoria_id?: number
	}
) => {
	const response = await apiFetch("/culturas", {
		method: "POST",
		body: JSON.stringify(data),
	})

	if (!response.ok) {
		throw new Error(
			response.status === 404
				? "Consultoria informada não encontrada"
				: "Erro ao cadastrar cultura"
		)
	}

	return response.json()
}

export function useCreateCultura() {
	const queryClient = useQueryClient()
	const router = useRouter()
	const { profile } = useAuth()

	return useMutation({
		mutationFn: (data: Omit<CreateCulturaAPIRequest, "consultoria_id">) => {
			return createCultura({
				...data,
				consultoria_id: profile?.consultoria_id,
			})
		},
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
			queryClient.invalidateQueries({ queryKey: ["get-culturas"] })
			Toast.show({
				type: "success",
				text1: "Sucesso",
				text2: "Cultura cadastrada",
				autoHide: true,
				visibilityTime: 3000,
			})
			router.back()
		},
	})
}
