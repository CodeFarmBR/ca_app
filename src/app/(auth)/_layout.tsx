import { Redirect, Stack } from "expo-router"
import { useAuth } from "@/context/auth-context"

export default function AuthLayout() {
	const { isAuthenticated } = useAuth()

	if (isAuthenticated) {
		// Se o usuário já está autenticado, não o deixe ver as telas de auth.
		// Redirecione-o para a home.
		return <Redirect href="/home" />
	}

	// Se não estiver autenticado, mostre as telas de autenticação normalmente.
	return <Stack screenOptions={{ headerShown: false }} />
}
