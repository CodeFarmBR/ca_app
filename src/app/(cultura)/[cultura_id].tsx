import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

export default function CulturaDetalhesScreen() {
	const { cultura_id } = useLocalSearchParams<{ cultura_id: string }>()

	return (
		<View>
			<Text>Cultura com o id: {cultura_id}</Text>
		</View>
	)
}
