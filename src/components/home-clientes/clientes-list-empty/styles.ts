import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		position: "absolute",
		left: 0,
		right: 0,
		top: "50%",
		transform: [{ translateY: 160 }], // Adjust this value as needed
		paddingHorizontal: 16,
	},
})
