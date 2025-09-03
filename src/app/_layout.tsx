import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Stack } from "expo-router"
import Toast from "react-native-toast-message"
import { AuthProvider } from "@/context/auth-context"

// Previne que a tela inicial pisque antes da decisão de rota ser tomada
export { ErrorBoundary } from "expo-router"

const queryClient = new QueryClient()

export default function Layout() {
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
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
						name="fazenda/fazenda-registrations"
						options={{ headerShown: false }}
					/>
					{/* <Stack.Screen
						name="sede/sede-registration"
						options={{ headerShown: false }}
					/> */}
					<Stack.Screen
						name="sede/[sede_id]"
						options={{ headerShown: false }}
					/>
				</Stack>
				<Toast />
			</QueryClientProvider>
		</AuthProvider>
	)
}
