import { MyButton } from "@/components/button";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { colors } from "@/theme/colors";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Dashboard() {
	return (
		<ProtectedRoute>
			<View style={styles.container}>
				<Text style={styles.title}>Dashboard</Text>

				<MyButton primary onPress={() => router.back()}>
					<Text style={[styles.titleBtn, { color: colors.background }]}>
						Voltar
					</Text>
				</MyButton>
			</View>
		</ProtectedRoute>
	);
}

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 16,
		padding: 32,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
	titleBtn: {
		fontSize: 16,
		fontWeight: "bold",
	},
});
