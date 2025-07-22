import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import UserIcon from "@/components/header/profileIcon";
import SettingsIcon from "@/components/header/settingsIcon";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { colors } from "@/theme/colors";

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

		const inTabsGroup = segments[0] === "(tabs)";

		// 3. Lógica de redirecionamento
		if (isAuthenticated && !inTabsGroup) {
			// Cenário: Usuário está LOGADO, mas NÃO está na área das abas.
			// Ação: Mande-o para a tela inicial do app.
			router.replace("/home");
		} else if (
			(!isAuthenticated && inTabsGroup) ||
			!(isAuthenticated || inTabsGroup)
		) {
			// Cenário: Usuário NÃO está LOGADO, mas está tentando acessar uma rota protegida (dentro de /tabs).
			// Ação: Mande-o para a tela de login.
			router.replace("/login");
		}
		// Se nenhuma dessas condições for atendida, significa que o usuário
		// já está onde deveria estar (logado e nas abas, ou deslogado e no login),
		// então não fazemos nada.
	}, [isAuthenticated, isLoading, segments, router]); // Executa o efeito quando o estado de auth ou a rota mudam

	// Se o carregamento terminou, renderiza a rota atual.
	return (
		<Stack
			screenOptions={{
				contentStyle: {
					backgroundColor: colors.background,
				},
			}}
		>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			<Stack.Screen
				name="(tabs)" // A tela que contém todas as suas abas
				options={{
					// Aqui configuramos o header customizado!
					headerTitle: "Olá, Consultor",
					headerTitleAlign: "left",
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerTitleStyle: {
						fontSize: 24,
						fontWeight: "700",
						color: colors.gray900,
					},
					// Adiciona um espaçamento à esquerda do ícone de usuário
					headerLeft: () => (
						<View style={{ paddingRight: 8 }}>
							<UserIcon />
						</View>
					),
					// Adiciona um espaçamento à direita do ícone de configurações
					headerRight: () => (
						<View>
							<SettingsIcon />
						</View>
					),
					headerShadowVisible: false,
				}}
			/>
			{/* Tela de detalhes do cliente, que pertence a esta pilha */}
			{/* <Stack.Screen
				name="cliente/[id]"
				options={{ title: "Detalhes do Cliente" }}
			/> */}
			{/* Tela de configurações, que também pertence a esta pilha */}
			{/* <Stack.Screen
				name="settings"
				options={{ title: "Configurações", presentation: "modal" }}
			/> */}
		</Stack>
	);
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
