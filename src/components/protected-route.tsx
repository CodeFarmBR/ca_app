// components/ProtectedRoute.tsx

import { Redirect } from "expo-router"
import { ActivityIndicator, View } from "react-native"
import { useAuth } from "@/context/auth-context"

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, isLoading } = useAuth()

	if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ActivityIndicator size="large" />
			</View>
		)
	}

	if (!isAuthenticated) {
		return <Redirect href="/" />
	}

	return <>{children}</>
}
