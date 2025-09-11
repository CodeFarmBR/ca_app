import { Plus } from "lucide-react-native"
import { Pressable, StyleSheet, Text } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"

export function AtribuirCulturaButton() {
	return (
		<Pressable style={styles.button}>
			<Text
				style={[typography.bodyMd, { color: colors.background, fontSize: 12 }]}
			>
				Atribuir Cultura
			</Text>
			<Plus color={colors.background} size={16} strokeWidth={1} />
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 16,
		paddingVertical: 6,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.green500,
		borderRadius: 30,
		gap: 4,
	},
})
