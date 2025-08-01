import { CirclePlus } from "lucide-react-native"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import ClientesListEmpty from "@/components/homeClientes/Cliente-list-empty"
import { ClienteListItem } from "@/components/homeClientes/cliente-list-item"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/context/auth-context"
import { useClientes } from "@/http/use-cliente"
import { colors } from "@/themes/colors"

export default function HomeClientesScreen() {
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

	const { profile } = useAuth()
	const { data, isLoading, refetch, isFetching } = useClientes(
		profile?.consultoria_id
	)

	return (
		<ProtectedRoute>
			<SafeAreaView style={styles.container}>
				<View style={styles.clientsContainer}>
					<View style={styles.headerSecondary}>
						<Text style={styles.title}>MEUS CLIENTES</Text>
						<CirclePlus strokeWidth={1} />
					</View>

					{isLoading ? (
						<Text>Carregando...</Text>
					) : (
						<FlatList
							data={data}
							ItemSeparatorComponent={() => (
								<View style={styles.listItemSeparator} />
							)}
							keyExtractor={(item) => String(item.usuario.usuario_id)}
							ListEmptyComponent={() => <ClientesListEmpty />}
							onRefresh={refetch}
							refreshing={isFetching}
							renderItem={({ item }) => (
								<ClienteListItem
									empresa={item.nome_empresa}
									id={item.usuario.usuario_id}
									nome={item.usuario.nome}
								/>
							)}
						/>
					)}
				</View>
			</SafeAreaView>
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
	containerB: {
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
	listItemSeparator: {
		borderWidth: 1,
		borderColor: colors.gray50,
		backgroundColor: colors.gray50,
	},
})
