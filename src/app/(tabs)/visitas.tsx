import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { globalStyles } from "@/themes/global-styles"

export default function HomeCulturasScreen() {
	return (
		<SafeAreaView style={globalStyles.screenContainer}>
			<Text>Home Visitas</Text>
		</SafeAreaView>
	)
}
