import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ProtectedRoute } from "@/components/protected-route"
import { globalStyles } from "@/themes/global-styles"

export default function HomeCalendarioScreen() {
	return (
		<ProtectedRoute>
			<SafeAreaView style={globalStyles.screenContainer}>
				<Text>Home Calendário</Text>
			</SafeAreaView>
		</ProtectedRoute>
	)
}
