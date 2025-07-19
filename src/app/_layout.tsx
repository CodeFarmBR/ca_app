import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { AuthProvider, useAuth } from "@/context/AuthContext";

// Previne que a tela inicial pisque antes da decisão de rota ser tomada
export { ErrorBoundary } from "expo-router";

const queryClient = new QueryClient();

// Componente separado para a lógica de roteamento
function RootLayoutNav() {
	const { isAuthenticated, isLoading } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		// Se o estado de autenticação ainda está carregando, não faça nada.
		if (isLoading) {
			return;
		}

		const inAuthGroup = segments[0] === "auth";

		// Se o usuário está logado e está em uma rota de autenticação,
		// navegue para a home.
		if (isAuthenticated && inAuthGroup) {
			router.replace("/tabs/home");
		}
		// Se o usuário NÃO está logado e NÃO está em uma rota de autenticação,
		// navegue para o login.
		else if (!(isAuthenticated || inAuthGroup)) {
			router.replace("/auth/login");
		}
	}, [isAuthenticated, isLoading, segments, router]); // Executa o efeito quando o estado de auth ou a rota mudam

	// Enquanto carrega, pode mostrar uma tela de splash ou null
	if (isLoading) {
		return <View />; // Ou um componente de Splash Screen
	}

	// Se o carregamento terminou, renderiza a rota atual.
	return <Slot />;
}

export default function Layout() {
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<RootLayoutNav />
			</QueryClientProvider>
		</AuthProvider>
	);
}
