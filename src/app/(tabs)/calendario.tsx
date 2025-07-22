import { Text, View } from "react-native";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function HomeCalendario() {
	return (
		<ProtectedRoute>
			<View>
				<Text>Home Calendário</Text>
			</View>
		</ProtectedRoute>
	);
}
