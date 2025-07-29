import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Slot } from "expo-router"
import { AuthProvider } from "@/context/auth-context"

// Previne que a tela inicial pisque antes da decisão de rota ser tomada
export { ErrorBoundary } from "expo-router"

const queryClient = new QueryClient()

export default function Layout() {
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<Slot />
			</QueryClientProvider>
		</AuthProvider>
	)
}
