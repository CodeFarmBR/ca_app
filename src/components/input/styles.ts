import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 6,
		borderWidth: 1,
		paddingHorizontal: 16,
		height: 48,
	},
	input: {
		flex: 1,
		paddingVertical: 13,
		color: colors.gray900,
	},
	emptyDefault: {
		borderColor: colors.gray50,
	},
	emptyActive: {
		borderColor: colors.green500,
		color: colors.gray900,
	},
	filledDefault: {
		borderColor: colors.gray50,
		color: colors.gray900,
	},
	filledActive: {
		borderColor: colors.green500,
		color: colors.gray900,
	},
	emptyError: {
		backgroundColor: colors.danger,
		borderColor: colors.red400,
		color: colors.red400,
	},
	filledError: {
		backgroundColor: colors.danger,
		borderColor: colors.red400,
		color: colors.gray900,
	},
});
