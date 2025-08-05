import { StyleSheet } from "react-native"
import { colors } from "@/themes/colors"

export const styles = StyleSheet.create({
	fazendaListItem: {
		width: 140,
		height: 140,
		marginRight: 12,
		borderWidth: 1,
		borderColor: colors.gray500,
		borderRadius: 8,
	},
	fazendaListItemImage: {
		height: 90,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.gray50,
		borderBottomWidth: 1,
		borderColor: colors.gray500,
		borderTopEndRadius: 8,
		borderTopStartRadius: 8,
	},
	fazendaListItemInfo: {
		paddingHorizontal: 4,
		gap: 4,
	},
})
