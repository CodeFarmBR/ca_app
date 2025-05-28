import { MyButton } from "@/components/button";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
	const auth = useAuth();
	const router = useRouter();

	const name = auth.profile?.nome;

	return (
		<ProtectedRoute>
			<View style={styles.container}>
				<Text style={styles.title}>Home</Text>

				<MyButton primary onPress={() => router.back()}>
					<Text style={[styles.titleBtn, { color: colors.background }]}>
						Voltar {name}
					</Text>
				</MyButton>
			</View>
		</ProtectedRoute>
	);
}

const styles = StyleSheet.create({
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
