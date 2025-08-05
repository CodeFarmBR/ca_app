import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CreateClientForm from "@/components/create-client-form"
import { ProtectedRoute } from "@/components/protected-route"
import { RegisterScreenHeader } from "@/components/register-screen-header"

export default function ClientRegistrationScreen() {
	return (
		<ProtectedRoute>
			<SafeAreaView style={styles.container}>
				<RegisterScreenHeader title="Cliente" />

				<CreateClientForm />
			</SafeAreaView>
		</ProtectedRoute>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 80,
		paddingHorizontal: 16,
		paddingVertical: 20,
	},
})
