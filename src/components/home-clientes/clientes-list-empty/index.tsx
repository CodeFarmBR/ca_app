import { UserRoundPlus } from "lucide-react-native"
import { Text, View } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

export function ClientesListEmpty() {
	return (
		<View style={styles.container}>
			<UserRoundPlus color={colors.gray500} size={64} strokeWidth={1} />
			<Text
				style={[
					typography.bodyLg,
					{ fontWeight: "700", color: colors.gray500 },
				]}
			>
				Nenhum Cliente encontrado
			</Text>
			<Text
				style={[
					typography.bodyLg,
					{ color: colors.gray500, textAlign: "center" },
				]}
			>
				Toque no botão + para adicionar seu primeiro cliente
			</Text>
		</View>
	)
}
