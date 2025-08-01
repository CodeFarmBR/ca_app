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
})
