import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CreateClienteForm } from "@/components/create-cliente-form"
import { RegisterScreenHeader } from "@/components/register-screen-header"

export default function ClientRegistrationScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<RegisterScreenHeader backToHomePage title="Cliente" />

			<CreateClienteForm />
		</SafeAreaView>
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
