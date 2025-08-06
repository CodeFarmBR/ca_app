import { useLocalSearchParams } from "expo-router"
import { Text } from "react-native"

export default function FazendaDetailsScreen() {
	const { fazenda_id } = useLocalSearchParams()
	return <Text>Fazenda com o id: {fazenda_id}</Text>
}
