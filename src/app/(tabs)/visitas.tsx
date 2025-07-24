import { Text, View } from "react-native"
import { ProtectedRoute } from "@/components/protected-route"

export default function HomeVisitas() {
	return (
		<ProtectedRoute>
			<View>
				<Text>Home Visitas</Text>
			</View>
		</ProtectedRoute>
	)
}
