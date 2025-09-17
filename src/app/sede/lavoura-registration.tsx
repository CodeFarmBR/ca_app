import { useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { CreateLavouraForm } from "@/components/create-lavoura-form"
import { RegisterScreenHeader } from "@/components/register-screen-header"
import { globalStyles } from "@/themes/global-styles"

export default function LavouraRegistration() {
	const { sede_id } = useLocalSearchParams<{ sede_id: string }>()

	return (
		<SafeAreaView style={[globalStyles.screenContainer, { gap: 80 }]}>
			<RegisterScreenHeader title="Cadastrar Lavoura" />

			<CreateLavouraForm sede_id={Number(sede_id)} />
		</SafeAreaView>
	)
}
