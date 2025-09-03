import { Redirect } from "expo-router"
// import { ActivityIndicator } from "react-native"
// import { useAuth } from "@/context/auth-context"

// Este componente será renderizado por uma fração de segundo (ou nem isso)
// antes que o _layout.tsx decida para onde te redirecionar.
// Ele serve apenas para evitar o erro de "rota não encontrada".
export default function Index() {
	// const { isAuthenticated, isLoading } = useAuth()

	// if (isLoading) {
	// 	// Enquanto verifica o estado de autenticação, mostre um carregamento.
	// 	return <ActivityIndicator style={{ flex: 1 }} />
	// }

	// if (isAuthenticated) {
	// 	// Se o usuário está logado, redirecione para a tela inicial do app.
	// 	return <Redirect href="/(tabs)" />
	// }

	// Se o usuário não está logado, redirecione para a tela de login.
	return <Redirect href="/login" />
}
