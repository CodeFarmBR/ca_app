import { StyleSheet } from "react-native"
import { colors } from "@/themes/colors"

export const styles = StyleSheet.create({
	culturasListItem: {
		width: "100%",
		marginBottom: 6,
		marginTop: 6,
		paddingHorizontal: 8,
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	culturaDefaultImage: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: colors.gray50,
		alignItems: "center",
		justifyContent: "center",
	},
	culturaInfo: {
		flexDirection: "row",
	},
})
