import { useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native"
import { CreateFazendaForm } from "@/components/create-fazenda-form"
import { RegisterScreenHeader } from "@/components/register-screen-header"
import { globalStyles } from "@/themes/global-styles"

export default function FazendaRegistrationScreen() {
	const { cliente_id } = useLocalSearchParams<{ cliente_id: string }>()

	return (
		<SafeAreaView style={[globalStyles.screenContainer, { gap: 80 }]}>
			<RegisterScreenHeader title="Cadastrar Fazenda" />

			<CreateFazendaForm clienteId={cliente_id} />
		</SafeAreaView>
	)
}
