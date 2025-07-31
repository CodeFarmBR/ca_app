import { StyleSheet } from "react-native"
import { colors } from "@/themes/colors"

export const styles = StyleSheet.create({
	form: {
		width: "100%",
		flex: 1,
		alignItems: "center",
		gap: 64,
	},
	inputs: {
		width: "100%",
		gap: 16,
	},
	input: {
		gap: 4,
	},
	inputError: {
		color: colors.red400,
		fontWeight: 700,
	},
	submitButtons: {
		width: "100%",
		gap: 16,
	},
})
