import { useLocalSearchParams } from "expo-router"
import { Text } from "react-native"

export default function SedeDetailsScreen() {
	const { sede_id } = useLocalSearchParams<{ sede_id: string }>()

	return <Text>Sede com o id: {sede_id}</Text>
}
