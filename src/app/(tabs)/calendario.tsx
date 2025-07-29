import { Text, View } from "react-native"
import { ProtectedRoute } from "@/components/protected-route"

export default function HomeCalendarioScreen() {
	return (
		<ProtectedRoute>
			<View>
				<Text>Home Calendário</Text>
			</View>
		</ProtectedRoute>
	)
}
