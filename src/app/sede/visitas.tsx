import { SafeAreaView, Text } from "react-native"
import { Header } from "@/components/header"
import { globalStyles } from "@/themes/global-styles"

export default function LavouraDetailsScreen() {
	return (
		<SafeAreaView style={globalStyles.screenContainer}>
			<Header backToHomeIcon />
			<Text>Visitas agendadas</Text>
			<Text>Visitas concluídas</Text>
		</SafeAreaView>
	)
}
