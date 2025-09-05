import { StyleSheet } from "react-native"
import { colors } from "@/themes/colors"

export const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: colors.white,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		padding: 16,
		height: "80%",
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	modalTitle: {
		color: colors.gray900,
	},
	closeButton: {
		padding: 8,
	},
	loadingText: {
		textAlign: "center",
		padding: 20,
		color: colors.gray500,
	},
	flatListContent: {
		paddingBottom: 16,
	},
	culturaItem: {
		flexDirection: "column",
		backgroundColor: colors.white,
		borderRadius: 8,
		padding: 16,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: colors.gray300,
	},
	culturaInfo: {
		marginBottom: 12,
	},
	culturaNome: {
		color: colors.gray900,
		marginBottom: 4,
	},
	culturaVariedade: {
		color: colors.gray500,
	},
	dateInputsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 12,
		gap: 12,
	},
	dateInputWrapper: {
		flex: 1,
	},
	dateLabel: {
		color: colors.gray500,
		marginBottom: 4,
	},
	dateInput: {
		height: 40,
		borderWidth: 1,
		borderColor: colors.gray300,
		borderRadius: 8,
		paddingHorizontal: 12,
		color: colors.gray900,
	},
	addButton: {
		alignSelf: "center",
		backgroundColor: colors.green500,
		borderRadius: 20,
		padding: 8,
	},
	disabledButton: {
		backgroundColor: colors.gray300,
	},
})
