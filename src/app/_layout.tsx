import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Slot } from "expo-router"
import Toast from "react-native-toast-message"
import { AuthProvider } from "@/context/auth-context"

// Previne que a tela inicial pisque antes da decisão de rota ser tomada
export { ErrorBoundary } from "expo-router"

const queryClient = new QueryClient()

export default function Layout() {
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<Slot />
				<Toast />
			</QueryClientProvider>
		</AuthProvider>
	)
}
