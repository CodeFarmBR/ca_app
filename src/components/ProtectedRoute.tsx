// components/ProtectedRoute.tsx
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		console.log("Is loading");

		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (!isAuthenticated) {
		console.log("Isn't authenticated");
		return <Redirect href="/" />; // Redireciona para login (index.tsx)
	}

	return <>{children}</>;
};
