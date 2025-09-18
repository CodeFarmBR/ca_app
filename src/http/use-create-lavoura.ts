import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import Toast from "react-native-toast-message"
import { apiFetch } from "./api-client"
import type { CreateLavouraAPIRequest } from "./types/create-lavoura-request"

type CreateLavouraParams = CreateLavouraAPIRequest & {
	sede_id: number
}

const createLavoura = async ({
	sede_id,
	...requestData
}: CreateLavouraParams) => {
	const response = await apiFetch(`/sedes/${sede_id}/lavouras/`, {
		method: "POST",
		body: JSON.stringify(requestData),
	})

	if (!response.ok) {
		const errorData = await response.json().catch(() => null)
		throw new Error(errorData?.error || "Falha ao cadastrar nova lavoura")
	}

	return response.json()
}

export function useCreateLavoura() {
	const queryClient = useQueryClient()
	const router = useRouter()

	return useMutation({
		mutationFn: createLavoura,
		onError: (error: Error) => {
			Toast.show({
				type: "error",
				text1: "Falha",
				text2: error.message,
			})
			router.back()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["get-lavouras-by-sede"] })
			Toast.show({
				type: "success",
				text1: "Sucesso",
				text2: "Lavoura cadastrada",
			})
			router.back()
		},
	})
}
