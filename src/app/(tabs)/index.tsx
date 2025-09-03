import { Link } from "expo-router"
import { CirclePlus } from "lucide-react-native"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ClientesListEmpty } from "@/components/home-clientes/clientes-list-empty"
import { ClientesListItem } from "@/components/home-clientes/clientes-list-item"
import { ListItemSeparator } from "@/components/list-item-separator"
import { useAuth } from "@/context/auth-context"
import { useClientes } from "@/http/use-clientes"
import { globalStyles } from "@/themes/global-styles"
import { typography } from "@/themes/typography"

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
		<SafeAreaView style={[globalStyles.screenContainer, styles.container]}>
			<View style={styles.clientsContainer}>
				<View style={styles.headerSecondary}>
					<Text style={typography.headingSmBold}>MEUS CLIENTES</Text>
					<Link href={"/cliente/cliente-registration"}>
						<CirclePlus strokeWidth={1} />
					</Link>
				</View>

				{isLoading ? (
					<Text>Carregando...</Text>
				) : (
					<FlatList
						contentContainerStyle={{ flexGrow: 1 }}
						data={data}
						ItemSeparatorComponent={() => <ListItemSeparator />}
						keyExtractor={(item) => String(item.usuario.usuario_id)}
						ListEmptyComponent={() => <ClientesListEmpty />}
						onRefresh={refetch}
						refreshing={isFetching}
						renderItem={({ item }) => (
							<ClientesListItem
								cliente_id={item.usuario.usuario_id}
								empresa={item.nome_empresa}
								nome={item.usuario.nome}
							/>
						)}
					/>
				)}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		justifyContent: "flex-start",
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
})
