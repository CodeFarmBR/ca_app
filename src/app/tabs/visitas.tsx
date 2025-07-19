import { Text, View } from "react-native";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function HomeVisitas() {
	return (
		<ProtectedRoute>
			<View>
				<Text>Home Visitas</Text>
			</View>
		</ProtectedRoute>
	);
}
