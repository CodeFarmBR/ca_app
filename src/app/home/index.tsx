import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { MyButton } from "@/components/button";
import Header from "@/components/home/header";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { colors } from "@/theme/colors";

export default function Home() {
	const { profile, logout } = useAuth();
	const router = useRouter();

	const name = profile?.nome;

	return (
		<ProtectedRoute>
			<View style={styles.container}>
				<Header />
				<Text style={styles.title}>Home</Text>

				<MyButton primary activeOpacity={0.8} onPress={() => logout()}>
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
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 16,
		paddingHorizontal: 16,
		paddingVertical: 44,
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
