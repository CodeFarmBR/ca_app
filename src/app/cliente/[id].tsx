import { useLocalSearchParams } from "expo-router"
import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Header from "@/components/header"
import { ProtectedRoute } from "@/components/protected-route"
import { globalStyles } from "@/themes/global-styles"

export default function ClienteDetalhesScreen() {
	const { id } = useLocalSearchParams<{ id: string }>()

	return (
		<ProtectedRoute>
			<SafeAreaView style={globalStyles.screenContainer}>
				<Header backToLastPageIcon />

				<Text>Cliente com o id: {id}</Text>
			</SafeAreaView>
		</ProtectedRoute>
	)
}
