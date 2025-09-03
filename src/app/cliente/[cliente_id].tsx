import { useLocalSearchParams } from "expo-router"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CulturasListEmpty } from "@/components/cliente-details/culturas-list-empty"
import { CulturasListItem } from "@/components/cliente-details/culturas-list-item"
import { FazendasListEmpty } from "@/components/cliente-details/fazendas-list-empty"
import { FazendasListItem } from "@/components/cliente-details/fazendas-list-item"
import { Header } from "@/components/header"
import { ListItemSeparator } from "@/components/list-item-separator"
import { ListsHeader } from "@/components/lists-header"
import { useCliente } from "@/http/use-cliente"
import { useClienteCulturas } from "@/http/use-cliente-culturas"
import { useFazendas } from "@/http/use-fazendas"
import { dayjs } from "@/lib/dayjs"
import { colors } from "@/themes/colors"
import { globalStyles } from "@/themes/global-styles"
import { typography } from "@/themes/typography"

export default function ClienteDetailsScreen() {
	const { cliente_id } = useLocalSearchParams<{ cliente_id: string }>()
	const { data: cliente } = useCliente(cliente_id)

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
		<SafeAreaView style={globalStyles.screenContainer}>
			<View style={styles.headerContainer}>
				<Header backToHomeIcon />

				<View style={styles.mainContainer}>
					<View style={styles.consultorInfo}>
						<Text style={typography.headingSmBold}>
							{cliente?.usuario.nome}
						</Text>
						<Text style={[typography.bodyMd, { color: colors.gray500 }]}>
							{cliente?.nome_empresa}
						</Text>
					</View>

					<View style={styles.listsContainer}>
						<ListsHeader
							pagePath={`/fazenda/fazenda-registration?cliente_id=${cliente_id}`}
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
									<FazendasListItem
										fazenda_id={item.fazenda_id}
										localizacao={item.localizacao}
										nome={item.nome}
									/>
								)}
							/>
						)}
					</View>

					<View style={styles.listsContainer}>
						<ListsHeader pagePath="/" titleHeader="CULTURAS" />

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
								renderItem={({ item }) => {
									const dataInicioCultura = dayjs(item.data_inicio).format(
										"DD/MM"
									)
									const dataFimCultura = dayjs(item.data_fim).format("DD/MM")

									return (
										<CulturasListItem
											dataFim={dataFimCultura}
											dataInicio={dataInicioCultura}
											nome={item.cultura.nome}
											variedade={item.cultura.variedade}
										/>
									)
								}}
							/>
						)}
					</View>
				</View>
			</View>
		</SafeAreaView>
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
		flexGrow: 1, // Faz com que o container ocupe toda a largura disponível
	},
})
