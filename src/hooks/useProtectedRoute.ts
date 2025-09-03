import { useRouter, useSegments } from "expo-router"
import { useEffect } from "react"
import { useAuth } from "@/context/auth-context"

export function useProtectedRoute() {
	const { isAuthenticated, isLoading } = useAuth()
	const segments = useSegments()
	const router = useRouter()

	useEffect(() => {
		if (isLoading) {
			return
		}

		const inAuthGroup = segments[0] === "(auth)"

		if (!(isAuthenticated || inAuthGroup)) {
			router.replace("/(auth)/login")
		}

		if (isAuthenticated && inAuthGroup) {
			router.replace("/(tabs)")
		}
	})
}
