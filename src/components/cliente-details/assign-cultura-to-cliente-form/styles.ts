import { StyleSheet } from "react-native"
import { colors } from "@/themes/colors"

export const styles = StyleSheet.create({
	formContainer: {
		alignItems: "center",
		gap: 8,
	},
	datePickersContainer: {
		width: "100%",
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
	},
	datePickerField: {
		flex: 1,
		width: "100%",
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
