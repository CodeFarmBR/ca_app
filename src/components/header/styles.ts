import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
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
	configIcon: {
		width: 32,
		height: 32,
		padding: 3,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.green500,
		borderRadius: "100%",
	},
});
