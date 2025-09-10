import { StyleSheet } from "react-native"
import { colors } from "@/themes/colors"

export const styles = StyleSheet.create({
	culturaDefaultImage: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: colors.gray50,
		alignItems: "center",
		justifyContent: "center",
	},
	listItemContainer: {
		width: "100%",
		flexDirection: "row",
		paddingHorizontal: 12,
		paddingVertical: 8,
		justifyContent: "space-between",
		alignItems: "center",
		borderWidth: 1,
		borderColor: colors.gray50,
		borderRadius: 4,
	},
	lavouraInfoContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
})
