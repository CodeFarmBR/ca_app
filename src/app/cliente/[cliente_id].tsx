import { useLocalSearchParams } from "expo-router"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CulturaListItem } from "@/components/client-details/cultura-list-item"
import { CulturasListEmpty } from "@/components/client-details/culturas-list-empty"
import { FazendaListItem } from "@/components/client-details/fazenda-list-item"
import { FazendasListEmpty } from "@/components/client-details/fazendas-list-empty"
import Header from "@/components/header"
import { ListItemSeparator } from "@/components/listItemSeparator"
import { ListsHeader } from "@/components/lists-header"
import { ProtectedRoute } from "@/components/protected-route"
import { useClienteCulturas } from "@/http/use-cliente-culturas"
import { useFazendas } from "@/http/use-fazendas"
import { colors } from "@/themes/colors"
import { globalStyles } from "@/themes/global-styles"
import { typography } from "@/themes/typography"

export default function ClienteDetalhesScreen() {
	const { cliente_id } = useLocalSearchParams<{ cliente_id: string }>()
	const {
		data: fazendas,
		isLoading: fazendasIsLoading,
		refetch: fazendasRefetch,
		isFetching: fazendasIsFetching,
	} = useFazendas(cliente_id)

	const {
		data: culturas,
		isLoading: culturasIsLoading,
		refetch: culturasRefetch,
		isFetching: culturasIsFetching,
	} = useClienteCulturas(cliente_id)

	return (
		<ProtectedRoute>
			<SafeAreaView style={globalStyles.screenContainer}>
				<View style={styles.headerContainer}>
					<Header backToHomeIcon />

					<View style={styles.mainContainer}>
						<View style={styles.consultorInfo}>
							<Text style={typography.headingSmBold}>Consultor</Text>
							<Text style={[typography.bodyMd, { color: colors.gray500 }]}>
								Empresa
							</Text>
						</View>

						<View style={styles.listsContainer}>
							<ListsHeader
								onAddPress={() => {
									return
								}}
								titleHeader="FAZENDAS"
							/>

							{fazendasIsLoading ? (
								<Text>Carregando...</Text>
							) : (
								<FlatList
									contentContainerStyle={styles.flatList}
									data={fazendas}
									horizontal
									keyExtractor={(item) => String(item.fazenda_id)}
									ListEmptyComponent={() => <FazendasListEmpty />}
									onRefresh={fazendasRefetch}
									refreshing={fazendasIsFetching}
									renderItem={({ item }) => (
										<FazendaListItem
											fazenda_id={item.fazenda_id}
											localizacao={item.localizacao}
											nome={item.nome}
										/>
									)}
								/>
							)}
						</View>

						<View style={styles.listsContainer}>
							<ListsHeader
								onAddPress={() => {
									return
								}}
								titleHeader="CULTURAS"
							/>

							{culturasIsLoading ? (
								<Text>Carregando...</Text>
							) : (
								<FlatList
									contentContainerStyle={[styles.flatList, { flexGrow: 1 }]}
									data={culturas}
									ItemSeparatorComponent={() => <ListItemSeparator />}
									keyExtractor={(item) => String(item.cliente_cultura_id)}
									ListEmptyComponent={() => <CulturasListEmpty />}
									onRefresh={culturasRefetch}
									refreshing={culturasIsFetching}
									renderItem={({ item }) => (
										<CulturaListItem
											dataFim={item.data_fim}
											dataInicio={item.data_inicio}
											nome={item.cultura.nome}
											variedade={item.cultura.variedade}
										/>
									)}
								/>
							)}
						</View>
					</View>
				</View>
			</SafeAreaView>
		</ProtectedRoute>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		gap: 20,
	},
	mainContainer: {
		gap: 32,
	},
	consultorInfo: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: colors.gray50,
		borderRadius: 4,
	},
	listsContainer: {
		width: "100%",
		alignItems: "stretch",
		gap: 12,
	},
	flatList: {
		flexGrow: 1,
		width: "100%",
		paddingHorizontal: 0, // remova margens se não quiser espaço nas laterais
	},
})
