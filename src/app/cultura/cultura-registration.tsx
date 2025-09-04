import { SafeAreaView } from "react-native-safe-area-context"
import { CreateCulturaForm } from "@/components/create-cultura-form"
import { RegisterScreenHeader } from "@/components/register-screen-header"
import { globalStyles } from "@/themes/global-styles"

export default function CulturaRegistration() {
	return (
		<SafeAreaView style={[globalStyles.screenContainer, { gap: 80 }]}>
			<RegisterScreenHeader backToHomePage title="Cultura" />
			<CreateCulturaForm />
		</SafeAreaView>
	)
}
