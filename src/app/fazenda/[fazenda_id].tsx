import { CirclePlus } from "lucide-react-native"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Header } from "@/components/header"
import { ProtectedRoute } from "@/components/protected-route"
import { colors } from "@/themes/colors"
import { globalStyles } from "@/themes/global-styles"
import { typography } from "@/themes/typography"

export default function FazendaDetailsScreen() {
	// const { fazenda_id } = useLocalSearchParams<{ fazenda_id: string }>()

	return (
		<ProtectedRoute>
			<SafeAreaView style={[globalStyles.screenContainer, { gap: 20 }]}>
				<Header backToLastPageIcon />

				<View style={{ width: "100%", flex: 1, gap: 12 }}>
					<View style={styles.fazendaInfo}>
						<Text style={typography.headingMd}>Fazenda xyz</Text>
						<Text style={typography.headingXs}>SEDES</Text>
						<Pressable style={styles.addSedeIcon}>
							<CirclePlus color={colors.background} size={32} strokeWidth={1} />
						</Pressable>
					</View>

					{/* <SedesListEmpty /> */}
				</View>
			</SafeAreaView>
		</ProtectedRoute>
	)
}

const styles = StyleSheet.create({
	fazendaInfo: {
		gap: 4,
		alignItems: "center",
	},
	addSedeIcon: {
		backgroundColor: colors.green500,
		borderRadius: 20,
	},
})
