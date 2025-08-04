import { useLocalSearchParams } from "expo-router"
import { CirclePlus } from "lucide-react-native"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CulturasListEmpty } from "@/components/client-details/culturas-list-empty"
import { FazendasListEmpty } from "@/components/client-details/fazendas-list-empty"
import Header from "@/components/header"
import { ProtectedRoute } from "@/components/protected-route"
import { colors } from "@/themes/colors"
import { globalStyles } from "@/themes/global-styles"
import { typography } from "@/themes/typography"
import { FarmIcon } from "../../../assets/farm-icon"

export default function ClienteDetalhesScreen() {
	const { id } = useLocalSearchParams<{ id: string }>()

	return (
		<ProtectedRoute>
			<SafeAreaView style={globalStyles.screenContainer}>
				<View style={styles.headerContainer}>
					<Header backToHomeIcon />

					<View style={styles.mainContainer}>
						<View style={styles.consultorInfo}>
							<Text style={typography.headingSmBold}>Consultor</Text>
							<Text style={[typography.bodyMd, { color: colors.gray500 }]}>
								Empresa
							</Text>
						</View>

						<View style={styles.listsContainer}>
							<View style={styles.headerList}>
								<Text style={[typography.headingXs, styles.titleHeaderList]}>
									FAZENDAS
								</Text>
								<Pressable>
									<CirclePlus strokeWidth={1} />
								</Pressable>
							</View>

							<View style={styles.fazendaListItem}>
								<View style={styles.fazendaListItemImage}>
									<FarmIcon />
								</View>
								<View style={styles.fazendaListItemInfo}>
									<Text style={[typography.bodyMd]}>Fazenda xyz</Text>
									<Text style={[typography.bodySm, { color: colors.gray500 }]}>
										Luziânia, Goiás
									</Text>
								</View>
							</View>
							{/* <FazendasListEmpty /> */}
						</View>

						<View style={styles.listsContainer}>
							<View style={styles.headerList}>
								<Text
									style={[typography.headingXs, styles.titleHeaderList, {}]}
								>
									CULTURAS
								</Text>
								<Pressable>
									<CirclePlus strokeWidth={1} />
								</Pressable>
							</View>

							<CulturasListEmpty />
						</View>
					</View>
				</View>
			</SafeAreaView>
		</ProtectedRoute>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		gap: 20,
	},
	mainContainer: {
		gap: 32,
	},
	consultorInfo: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: colors.gray50,
		borderRadius: 4,
	},
	listsContainer: {
		width: "100%",
		alignItems: "center",
		gap: 12,
	},
	headerList: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	titleHeaderList: {
		color: colors.gray900,
	},
	fazendaListItem: {
		width: 140,
		height: 140,
		borderWidth: 1,
		borderColor: colors.gray500,
		borderRadius: 8,
	},
	fazendaListItemImage: {
		height: 90,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.gray50,
		borderBottomWidth: 1,
		borderColor: colors.gray500,
		borderTopEndRadius: 8,
		borderTopStartRadius: 8,
	},
	fazendaListItemInfo: {
		paddingHorizontal: 4,
		gap: 4,
	},
})
