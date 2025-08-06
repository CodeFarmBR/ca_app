import { Text, View } from "react-native"
import { FarmIcon } from "@/../assets/farm-icon"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

export function FazendasListEmpty() {
	return (
		<View style={styles.container}>
			<FarmIcon />
			<Text style={[typography.bodyLgBold, { color: colors.gray500 }]}>
				Nenhuma fazenda encontrada
			</Text>
			<Text style={[typography.bodyLg, { color: colors.gray500 }]}>
				Toque no botão + para adicionar a primeira
			</Text>
		</View>
	)
}
