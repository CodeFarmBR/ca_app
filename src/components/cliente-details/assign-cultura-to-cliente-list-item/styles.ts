import { StyleSheet } from "react-native"
import { colors } from "@/themes/colors"

export const styles = StyleSheet.create({
	container: {
		flex: 1,
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
