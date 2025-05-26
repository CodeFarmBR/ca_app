// app/_layout.tsx
import { Slot } from "expo-router";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";

const queryClient = new QueryClient();

export default function Layout() {
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<View style={{ flex: 1 }}>
					<Slot />
				</View>
			</QueryClientProvider>
		</AuthProvider>
	);
}
