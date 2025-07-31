import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

export default function ClienteDetalhesScreen() {
	const { id } = useLocalSearchParams<{ id: string }>()

	return (
		<View>
			<Text>Cliente com o id: {id}</Text>
		</View>
	)
}
