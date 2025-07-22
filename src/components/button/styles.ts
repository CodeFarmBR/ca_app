import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const Styles = StyleSheet.create({
	base: {
		width: "100%",
		height: 48,
		borderRadius: 6,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 8,
	},
	primary: {
		backgroundColor: colors.green500,
	},
	secundary: {
		backgroundColor: colors.background,
		borderWidth: 1,
		borderColor: colors.green500,
	},
	disabled: {
		backgroundColor: colors.gray50,
	},
});
