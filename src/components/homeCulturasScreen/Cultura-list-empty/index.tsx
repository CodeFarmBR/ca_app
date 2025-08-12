import { WheatOff } from "lucide-react-native"
import { Text, View } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

export function CulturasListEmpty() {
	return (
		<View style={styles.container}>
			<WheatOff color={colors.gray500} size={64} strokeWidth={1} />
			<Text style={[typography.bodyLgBold, { color: colors.gray500 }]}>
				Nenhuma cultura encontrada
			</Text>
			<Text
				style={[
					typography.bodyLg,
					{ color: colors.gray500, textAlign: "center" },
				]}
			>
				Toque no botão + para adicionar sua primeira cultura
			</Text>
		</View>
	)
}
