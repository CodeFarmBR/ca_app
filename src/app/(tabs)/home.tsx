import { CirclePlus, UserRoundPlus } from "lucide-react-native"
import { StyleSheet, Text, View } from "react-native"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"

export default function Home() {
	// Exemplo de criação de dado com watermellonDB
	// async function onTest() {
	// 	const clientesCollection = await database.get<Cliente>("clientes")

	// 	await database.write(async () => {
	// 		await clientesCollection.create((cliente: Cliente) => {
	// 			cliente.nome = "João"
	// 			cliente.email = "joao@gmail.com"
	// 			cliente.nomeEmpresa = "Empresa"
	// 			cliente.consultoria = "Consultoria"
	// 		})
	// 	})
	// }

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
