import { useLocalSearchParams } from "expo-router"
import { CirclePlus } from "lucide-react-native"
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { SedesListEmpty } from "@/components/fazenda-details/sedes-list-empty"
import { SedeListItem } from "@/components/fazenda-details/sedes-list-item"
import { Header } from "@/components/header"
import { ProtectedRoute } from "@/components/protected-route"
import { useFazenda } from "@/http/use-fazenda"
import { colors } from "@/themes/colors"
import { globalStyles } from "@/themes/global-styles"
import { typography } from "@/themes/typography"

export default function FazendaDetailsScreen() {
	const { fazenda_id } = useLocalSearchParams<{ fazenda_id: string }>()

	const { data, isLoading, refetch, isFetching } = useFazenda(
		Number(fazenda_id)
	)

	return (
		<ProtectedRoute>
			<SafeAreaView style={[globalStyles.screenContainer, { gap: 20 }]}>
				<Header backToLastPageIcon />

				<View style={{ width: "100%", flex: 1, gap: 12 }}>
					<View style={styles.fazendaInfo}>
						<Text style={typography.headingMd}>{data?.nome}</Text>
						<Text style={typography.headingXs}>SEDES</Text>
						<Pressable style={styles.addSedeIcon}>
							<CirclePlus color={colors.background} size={32} strokeWidth={1} />
						</Pressable>
					</View>

					{isLoading ? (
						<Text>Carregando...</Text>
					) : (
						<FlatList
							data={data?.sedes}
							ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
							keyExtractor={(item) => String(item.sede_id)}
							ListEmptyComponent={() => <SedesListEmpty />}
							onRefresh={refetch}
							refreshing={isFetching}
							renderItem={({ item }) => (
								<SedeListItem
									localizacao={item.localizacao}
									nome={item.nome}
									sede_id={item.sede_id}
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
	fazendaInfo: {
		gap: 4,
		alignItems: "center",
	},
	addSedeIcon: {
		backgroundColor: colors.green500,
		borderRadius: 20,
	},
})
