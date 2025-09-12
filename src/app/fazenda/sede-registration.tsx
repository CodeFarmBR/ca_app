import { useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { CreateSedeForm } from "@/components/create-sede-form"
import { RegisterScreenHeader } from "@/components/register-screen-header"
import { globalStyles } from "@/themes/global-styles"

export default function SedeRegistration() {
	const { fazenda_id } = useLocalSearchParams<{ fazenda_id: string }>()

	return (
		<SafeAreaView style={[globalStyles.screenContainer, { gap: 80 }]}>
			<RegisterScreenHeader title="Cadastrar Sede" />

			<CreateSedeForm fazenda_id={Number(fazenda_id)} />
		</SafeAreaView>
	)
}
