import { StyleSheet } from "react-native"
import { colors } from "@/themes/colors"

export const styles = StyleSheet.create({
	tabBarContainer: {
		position: "absolute", // Faz a barra "flutuar"
		bottom: 8,
		left: 8,
		right: 8,
		alignItems: "center",
	},
	tabBar: {
		width: 244,
		// height: 40,
		height: 40, // Padding não está sendo aplicado verticalmente, por isso a altura foi diminuida em 4
		padding: 2,
		backgroundColor: colors.green500,
		borderRadius: 22,
		flexDirection: "row",
		elevation: 2, // Sombra para Android
		// Sombra para iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	tabItem: {
		flex: 1,
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 4,
		borderRadius: 22,
	},
	tabItemFocused: {
		backgroundColor: colors.success,
	},
})
