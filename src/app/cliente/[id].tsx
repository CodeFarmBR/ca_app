import { useLocalSearchParams } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Header from "@/components/header"
import { ProtectedRoute } from "@/components/protected-route"
import { colors } from "@/themes/colors"
import { globalStyles } from "@/themes/global-styles"
import { typography } from "@/themes/typography"

export default function ClienteDetalhesScreen() {
	const { id } = useLocalSearchParams<{ id: string }>()

	return (
		<ProtectedRoute>
			<SafeAreaView style={globalStyles.screenContainer}>
				<View style={styles.headerContainer}>
					<Header backToLastPageIcon />

					<View style={styles.consultorInfo}>
						<Text style={typography.headingSmBold}>Consultor</Text>
						<Text style={[typography.bodyMd, { color: colors.gray500 }]}>
							Empresa
						</Text>
					</View>
					<Text>Cliente com o id: {id}</Text>
				</View>
			</SafeAreaView>
		</ProtectedRoute>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		gap: 20,
	},
	consultorInfo: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: colors.gray50,
		borderRadius: 4,
	},
})
