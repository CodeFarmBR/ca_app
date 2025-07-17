import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
	container: {
		width: 244,
		height: 40,
		padding: 4,
		backgroundColor: colors.green500,
		borderRadius: 22,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	navbarItem: {
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 16,
		paddingVertical: 4,
	},
	navbarItemSelected: {
		backgroundColor: colors.green200,
		borderRadius: 22,
	},
});
