import { StyleSheet } from "react-native"
import { colors } from "@/themes/colors"

export const styles = StyleSheet.create({
	listItemContainer: {
		width: "100%",
		padding: 8,
		borderWidth: 1,
		borderColor: colors.gray50,
		borderRadius: 4,
	},
	listItemInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
})
