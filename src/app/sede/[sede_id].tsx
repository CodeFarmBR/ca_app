import { useLocalSearchParams } from "expo-router"
import { FlatList, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Header } from "@/components/header"
import { PropertyInfo } from "@/components/property-info"
import { LavourasListEmpty } from "@/components/sede-details/lavouras-list-empty"
import { LavourasListItem } from "@/components/sede-details/lavouras-list-item"
import { useLavouras } from "@/http/use-lavouras"
import { dayjs } from "@/lib/dayjs"
import { globalStyles } from "@/themes/global-styles"

export default function SedeDetailsScreen() {
	const { sede_id } = useLocalSearchParams<{ sede_id: string }>()

	const { data, isLoading, refetch, isFetching } = useLavouras(Number(sede_id))

	return (
		<SafeAreaView style={[globalStyles.screenContainer, { gap: 20 }]}>
			<Header backToLastPageIcon />

			<PropertyInfo listHeader="LAVOURAS" nome="Sede X" />

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
						// Get the first cultura if available
						const cultura = item.culturas[0]?.cliente_cultura

						// Format dates if available
						const dataInicio = cultura?.data_inicio
							? dayjs(cultura.data_inicio).format("DD/MM/YYYY")
							: null

						const dataFim = cultura?.data_fim
							? dayjs(cultura.data_fim).format("DD/MM/YYYY")
							: null

						return (
							<LavourasListItem
								dataFim={dataFim}
								dataInicio={dataInicio}
								lavouraId={item.lavoura_id}
								nomeCultura={cultura?.cultura?.nome}
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
