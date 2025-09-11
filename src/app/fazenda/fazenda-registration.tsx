import { useLocalSearchParams } from "expo-router"
import { SafeAreaView, StyleSheet } from "react-native"
import { CreateFazendaForm } from "@/components/create-fazenda-form"
import { RegisterScreenHeader } from "@/components/register-screen-header"

export default function FazendaRegistrationScreen() {
	const { cliente_id } = useLocalSearchParams<{ cliente_id: string }>()

	return (
		<SafeAreaView style={styles.container}>
			<RegisterScreenHeader title="Cadastrar Fazenda" />

			<CreateFazendaForm clienteId={cliente_id} />
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
