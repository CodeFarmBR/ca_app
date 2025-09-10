import { FlatList, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { AssignCulturaToClienteListItem } from "@/components/cliente-details/assign-cultura-to-cliente-list-item"
import { CulturasListEmpty } from "@/components/home-culturas-screen/cultura-list-empty"
import { RegisterScreenHeader } from "@/components/register-screen-header"
import { useCulturas } from "@/http/use-culturas"
import { globalStyles } from "@/themes/global-styles"

export default function AssignCulturaToClienteModal() {
	const { data, isLoading, refetch, isFetching } = useCulturas()

	return (
		<SafeAreaView style={[globalStyles.screenContainer, { gap: 20 }]}>
			<RegisterScreenHeader title="Atribuir Cultura" />

			{isLoading ? (
				<Text>Carregando culturas...</Text>
			) : (
				<FlatList
					data={data}
					ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
					keyExtractor={(item) => String(item.cultura_id)}
					ListEmptyComponent={() => <CulturasListEmpty />}
					onRefresh={refetch}
					refreshing={isFetching}
					renderItem={({ item }) => (
						<AssignCulturaToClienteListItem
							nome={item.nome}
							variedade={item.variedade}
						/>
					)}
					style={{ width: "100%" }}
				/>
			)}
		</SafeAreaView>
	)
}
