import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Stack } from "expo-router"
import { ActivityIndicator } from "react-native"
import Toast from "react-native-toast-message"
import { AuthProvider, useAuth } from "@/context/auth-context"
import { useProtectedRoute } from "@/hooks/useProtectedRoute"

// Previne que a tela inicial pisque antes da decisão de rota ser tomada
export { ErrorBoundary } from "expo-router"

const queryClient = new QueryClient()

export function RootLayoutNav() {
	useProtectedRoute()
	const { isLoading } = useAuth()

	if (isLoading) {
		return (
			<ActivityIndicator
				size={"large"}
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			/>
		)
	}

	return (
		<Stack>
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen
				name="cliente/[cliente_id]"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="cliente/cliente-registration"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="cultura/[cultura_id]"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="cultura/cultura-registration"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="fazenda/[fazenda_id]"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="fazenda/fazenda-registration"
				options={{ headerShown: false }}
			/>
			{/* <Stack.Screen
						name="sede/sede-registration"
						options={{ headerShown: false }}
					/> */}
			<Stack.Screen name="sede/[sede_id]" options={{ headerShown: false }} />
		</Stack>
	)
}

export default function RootLayout() {
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<RootLayoutNav />
				<Toast />
			</QueryClientProvider>
		</AuthProvider>
	)
}
