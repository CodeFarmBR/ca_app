import { Text, View } from "react-native"
import { ProtectedRoute } from "@/components/protected-route"

export default function HomeCulturas() {
	return (
		<ProtectedRoute>
			<View>
				<Text>Home Culturas</Text>
			</View>
		</ProtectedRoute>
	)
}
