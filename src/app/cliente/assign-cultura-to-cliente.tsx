import { useLocalSearchParams } from "expo-router"
import { useRef } from "react"
import {
	FlatList,
	KeyboardAvoidingView,
	Platform,
	Text,
	View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { AssignCulturaToClienteListItem } from "@/components/cliente-details/assign-cultura-to-cliente-list-item"
import { CulturasListEmpty } from "@/components/home-culturas-screen/cultura-list-empty"
import { RegisterScreenHeader } from "@/components/register-screen-header"
import { useCulturas } from "@/http/use-culturas"
import { globalStyles } from "@/themes/global-styles"

export default function AssignCulturaToClienteModal() {
	const { data, isLoading, refetch, isFetching } = useCulturas()
	const { cliente_id } = useLocalSearchParams<{ cliente_id: string }>()
	const flatListRef = useRef<FlatList>(null)

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<SafeAreaView style={[globalStyles.screenContainer, { gap: 20 }]}>
				<RegisterScreenHeader title="Atribuir Cultura" />

				{isLoading ? (
					<Text>Carregando culturas...</Text>
				) : (
					<FlatList
						contentContainerStyle={{ paddingBottom: 120 }}
						data={data}
						ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
						keyboardDismissMode="on-drag"
						keyboardShouldPersistTaps="handled"
						keyExtractor={(item) => String(item.cultura_id)}
						ListEmptyComponent={() => <CulturasListEmpty />}
						onRefresh={refetch}
						ref={flatListRef}
						refreshing={isFetching}
						removeClippedSubviews={false}
						renderItem={({ item }) => (
							<AssignCulturaToClienteListItem
								cliente_id={cliente_id}
								cultura_id={item.cultura_id}
								nome={item.nome}
								variedade={item.variedade}
							/>
						)}
						style={{ width: "100%" }} // Add extra padding at bottom
					/>
				)}
			</SafeAreaView>
		</KeyboardAvoidingView>
	)
}
