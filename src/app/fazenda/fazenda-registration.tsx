import { useLocalSearchParams } from "expo-router"
import { SafeAreaView, StyleSheet } from "react-native"
import { CreateFazendaForm } from "@/components/create-fazenda-form"
import { ProtectedRoute } from "@/components/protected-route"
import { RegisterScreenHeader } from "@/components/register-screen-header"

export default function FazendaRegistrationScreen() {
	const { cliente_id } = useLocalSearchParams<{ cliente_id: string }>()

	return (
		<ProtectedRoute>
			<SafeAreaView style={styles.container}>
				<RegisterScreenHeader title="Fazenda" />

				<CreateFazendaForm clienteId={cliente_id} />
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
