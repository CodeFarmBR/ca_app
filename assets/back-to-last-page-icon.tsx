import { ArrowLeft } from "lucide-react-native"
import { StyleSheet, View } from "react-native"

export function BackToLastPageIcon() {
	return (
		<View style={styles.icons}>
			<ArrowLeft size={20} strokeWidth={1} />
		</View>
	)
}

const styles = StyleSheet.create({
	icons: {
		width: 32,
		height: 32,
		borderRadius: "100%",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
	},
})
