import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ProtectedRoute } from "@/components/protected-route"

export default function CulturaRegistration() {
	return (
		<ProtectedRoute>
			<SafeAreaView>
				<Text>Olá</Text>
			</SafeAreaView>
		</ProtectedRoute>
	)
}
