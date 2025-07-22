import { CirclePlus, UserRoundPlus } from "lucide-react-native"
import { Button, StyleSheet, Text, View } from "react-native"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import database from "@/db/index"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"

export default function Home() {
	const clientesCollection = database.get("clientes")

	async function onRead() {
		const allClientes = await database.get("clientes").query().fetch()
		console.log(allClientes)
	}

	return (
		<ProtectedRoute>
			<View style={styles.container}>
				<View style={styles.clientsContainer}>
					<View style={styles.headerSecondary}>
						<Text style={styles.title}>MEUS CLIENTES</Text>
						<CirclePlus strokeWidth={1} />
					</View>

					<View style={styles.noClientsFound}>
						<UserRoundPlus color={colors.gray500} size={64} strokeWidth={1} />
						<Text
							style={[
								typography.bodyLg,
								{ fontWeight: "700", color: colors.gray500 },
							]}
						>
							Nenhum Cliente encontrado
						</Text>
						<Text
							style={[
								typography.bodyLg,
								{ color: colors.gray500, textAlign: "center" },
							]}
						>
							Toque no botão + para adicionar seu primeiro cliente
						</Text>
						<Button onPress={() => onRead()} title="Read" />
					</View>
				</View>
			</View>
		</ProtectedRoute>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
		position: "relative",
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 20,
		paddingHorizontal: 16,
		paddingVertical: 20,
	},
	clientsContainer: {
		width: "100%",
		gap: 12,
		flex: 1, // Add this to make it take full height
	},
	headerSecondary: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	noClientsFound: {
		alignItems: "center",
		position: "absolute",
		left: 0,
		right: 0,
		top: "50%",
		transform: [{ translateY: -100 }], // Adjust this value as needed
		paddingHorizontal: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
	titleBtn: {
		fontSize: 16,
		fontWeight: "bold",
	},
})
