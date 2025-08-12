import { CirclePlus } from "lucide-react-native"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CulturasListEmpty } from "@/components/homeCulturasScreen/Cultura-list-empty"
import { CulturaListItem } from "@/components/homeCulturasScreen/cultura-list-item"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/context/auth-context"
import { useCulturas } from "@/http/use-culturas"
import { colors } from "@/themes/colors"

export default function HomeCulturasScreen() {
	const { profile } = useAuth()
	const { data, isLoading, refetch, isFetching } = useCulturas(
		profile?.consultoria_id
	)

	return (
		<ProtectedRoute>
			<SafeAreaView style={styles.container}>
				<View style={styles.culturasContainer}>
					<View style={styles.headerSecondary}>
						<Text style={styles.title}>MINHAS CULTURAS</Text>
						<CirclePlus strokeWidth={1} />
					</View>

					{isLoading ? (
						<Text>Carregando...</Text>
					) : (
						<FlatList
							contentContainerStyle={{ flexGrow: 1 }}
							data={data}
							ItemSeparatorComponent={() => (
								<View style={styles.listItemSeparator} />
							)}
							keyExtractor={(item) => String(item.cultura_id)}
							ListEmptyComponent={() => <CulturasListEmpty />}
							onRefresh={refetch}
							refreshing={isFetching}
							renderItem={({ item }) => (
								<CulturaListItem
									cultura_id={item.cultura_id}
									nome={item.nome}
									variedade={item.variedade}
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
	culturasContainer: {
		width: "100%",
		gap: 12,
		flex: 1,
	},
	headerSecondary: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
	listItemSeparator: {
		borderWidth: 1,
		borderColor: colors.gray50,
		backgroundColor: colors.gray50,
	},
})
