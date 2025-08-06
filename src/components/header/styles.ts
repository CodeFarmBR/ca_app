import { StyleSheet } from "react-native"
import { colors } from "@/themes/colors"

export const styles = StyleSheet.create({
	homeHeader: {
		height: 38,
		marginTop: 20,
		paddingHorizontal: 16,
		backgroundColor: colors.background,
	},
	header: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	titleView: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 8,
	},
	icons: {
		width: 32,
		height: 32,
		borderRadius: "100%",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
	},
	configIcon: {
		backgroundColor: colors.green500,
		borderWidth: 0,
	},
	houseIcon: {},
})
