import { StyleSheet } from "react-native"
import { colors } from "./colors"

export const globalStyles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 20,
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: colors.background,
	},
	emptyLists: {
		width: "100%",
		marginTop: 8,
		paddingHorizontal: 16,
		alignItems: "center",
	},
	form: {
		width: "100%",
		flex: 1,
		alignItems: "center",
		gap: 64,
	},
	inputsContainer: {
		width: "100%",
		gap: 16,
	},
	input: {
		gap: 16,
	},
	inputError: {
		color: colors.red400,
		fontWeight: 700,
	},
	submitButtons: {
		width: "100%",
		gap: 16,
	},
	culturaDefaultImage: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: colors.gray50,
		alignItems: "center",
		justifyContent: "center",
	},
})
