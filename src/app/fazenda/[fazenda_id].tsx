import { useLocalSearchParams } from "expo-router"
import { FlatList, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { SedesListEmpty } from "@/components/fazenda-details/sedes-list-empty"
import { SedeListItem } from "@/components/fazenda-details/sedes-list-item"
import { Header } from "@/components/header"
import { PropertyInfo } from "@/components/property-info"
import { useFazenda } from "@/http/use-fazenda"
import { globalStyles } from "@/themes/global-styles"

export default function FazendaDetailsScreen() {
	const { fazenda_id } = useLocalSearchParams<{ fazenda_id: string }>()

	const { data, isLoading, refetch, isFetching } = useFazenda(
		Number(fazenda_id)
	)

	return (
		<SafeAreaView style={[globalStyles.screenContainer, { gap: 20 }]}>
			<Header backToLastPageIcon />

			<View style={{ width: "100%", flex: 1, gap: 12 }}>
				<PropertyInfo
					listHeader="SEDES"
					nome={data?.nome}
					pagePath={`/fazenda/sede-registration?fazenda_id=${fazenda_id}`}
				/>

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
	)
}
