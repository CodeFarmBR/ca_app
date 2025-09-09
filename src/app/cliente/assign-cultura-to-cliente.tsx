import { Calendar as CalendarIcon, CirclePlus } from "lucide-react-native"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { RegisterScreenHeader } from "@/components/register-screen-header"
import { colors } from "@/themes/colors"
import { globalStyles } from "@/themes/global-styles"
import { typography } from "@/themes/typography"

export default function AssignCulturaToClienteModal() {
	return (
		<SafeAreaView style={[globalStyles.screenContainer, { gap: 20 }]}>
			<RegisterScreenHeader title="Atribuir Cultura" />

			<View style={styles.container}>
				<View style={styles.submitButtonContainer}>
					{/* <View style={globalStyles.culturaDefaultImage}>
						<Wheat color={colors.gray300} size={18} strokeWidth={1} />
					</View> */}
					<View style={styles.culturaInfoContainer}>
						<View style={styles.badgeCultura}>
							<Text
								style={[typography.bodyLgBold, { color: colors.background }]}
							>
								Milho
							</Text>
						</View>
						<Text style={typography.bodyMd}>AG 9025 PRO3</Text>
					</View>

					<Pressable>
						<CirclePlus color={colors.green500} size={32} strokeWidth={1} />
					</Pressable>
				</View>

				<View style={styles.datePickersContainer}>
					<View style={styles.datePickerField}>
						<Text style={typography.bodySm}>Data início:</Text>
						<View style={styles.datePickerInput}>
							<CalendarIcon color={colors.gray500} size={24} strokeWidth={1} />
							<TextInput placeholder="00/00" />
						</View>
					</View>

					<View style={styles.datePickerField}>
						<Text style={typography.bodySm}>Data fim:</Text>
						<View style={styles.datePickerInput}>
							<CalendarIcon color={colors.gray500} size={24} strokeWidth={1} />
							<TextInput placeholder="00/00" />
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		padding: 12,
		gap: 8,
		borderWidth: 1,
		borderColor: colors.gray50,
		borderRadius: 8,
	},
	submitButtonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	culturaInfoContainer: {
		flexDirection: "row",
		gap: 8,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	badgeCultura: {
		justifyContent: "center",
		paddingHorizontal: 6,
		paddingVertical: 1,
		borderRadius: 6,
		backgroundColor: colors.gray500,
	},
	datePickersContainer: {
		width: "100%",
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
	},
	datePickerField: {
		flex: 1,
	},
	datePickerInput: {
		padding: 4,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 4,
		borderWidth: 1,
		borderColor: colors.gray50,
		borderRadius: 8,
	},
})
