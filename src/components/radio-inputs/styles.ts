import { StyleSheet } from "react-native"
import { colors } from "@/themes/colors"

export const styles = StyleSheet.create({
	optionsContainer: {
		flexDirection: "row",
	},
	radioInputContainer: {
		width: "75%",
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	radioButton: {
		width: 20,
		height: 20,
		borderWidth: 2,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	radioButtonChecked: {
		width: 10,
		height: 10,
		backgroundColor: colors.green500,
		borderRadius: 5,
	},
})
