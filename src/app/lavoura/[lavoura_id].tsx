import { useLocalSearchParams } from "expo-router"
import { SafeAreaView, Text } from "react-native"
import { globalStyles } from "@/themes/global-styles"

export default function LavouraDetailsScreen() {
	const { lavoura_id } = useLocalSearchParams<{ lavoura_id: string }>()

	return (
		<SafeAreaView style={globalStyles.screenContainer}>
			<Text>Lavoura com o id: {lavoura_id}</Text>
		</SafeAreaView>
	)
}
