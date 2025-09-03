import { Text, View } from "react-native"
import { colors } from "@/themes/colors"
import { globalStyles } from "@/themes/global-styles"
import { typography } from "@/themes/typography"
import { FarmIcon } from "../../../assets/farm-icon"

export function FazendasListEmpty() {
	return (
		<View style={globalStyles.emptyLists}>
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
