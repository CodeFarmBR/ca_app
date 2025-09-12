import { useLocalSearchParams } from "expo-router"
import { FlatList, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Header } from "@/components/header"
import { PropertyInfo } from "@/components/property-info"
import { LavourasListEmpty } from "@/components/sede-details/lavouras-list-empty"
import { LavourasListItem } from "@/components/sede-details/lavouras-list-item"
import { useLavouras } from "@/http/use-lavouras"
import { globalStyles } from "@/themes/global-styles"

type CulturasByLavouraType = {
	cliente_cultura: {
		data_inicio: string
		data_fim: string
		cultura: {
			nome: string
			variedade: string
		}
	}
}[]

export default function SedeDetailsScreen() {
	const { sede_id } = useLocalSearchParams<{ sede_id: string }>()

	const { data, isLoading, refetch, isFetching } = useLavouras(Number(sede_id))

	function getCurrentCultura(culturasByLavoura: CulturasByLavouraType) {
		for (const cultura of culturasByLavoura) {
			const actualDate = new Date()

			const dataInicioCultura = new Date(cultura.cliente_cultura.data_inicio)
			const dataFimCultura = new Date(cultura.cliente_cultura.data_fim)

			if (
				dataInicioCultura.getTime() <= actualDate.getTime() &&
				dataFimCultura.getTime() >= actualDate.getTime()
			) {
				return cultura.cliente_cultura
			}
		}
		return null
	}

	return (
		<SafeAreaView style={[globalStyles.screenContainer, { gap: 20 }]}>
			<Header backToLastPageIcon />

			<PropertyInfo listHeader="LAVOURAS" nome={data?.nome} />

			{isLoading ? (
				<Text>Carregando...</Text>
			) : (
				<FlatList
					data={data?.lavouras}
					ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
					keyExtractor={(item) => String(item.lavoura_id)}
					ListEmptyComponent={() => <LavourasListEmpty />}
					onRefresh={refetch}
					refreshing={isFetching}
					renderItem={({ item }) => {
						const culturasByLavoura = item.culturas
						const currentCultura = getCurrentCultura(culturasByLavoura)

						return (
							<LavourasListItem
								currentCultura={currentCultura}
								lavouraId={item.lavoura_id}
								nomeLavoura={item.nome}
							/>
						)
					}}
					style={{ width: "100%" }}
				/>
			)}
		</SafeAreaView>
	)
}
