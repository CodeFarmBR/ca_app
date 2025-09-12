import { LandPlot } from "lucide-react-native"
import { Text, View } from "react-native"
import { colors } from "@/themes/colors"
import { globalStyles } from "@/themes/global-styles"
import { typography } from "@/themes/typography"

export function LavourasListEmpty() {
	return (
		<View style={[globalStyles.emptyLists, { marginTop: 120 }]}>
			<LandPlot color={colors.gray500} size={64} strokeWidth={1} />
			<Text style={[typography.bodyLgBold, { color: colors.gray500 }]}>
				Nenhuma lavoura encontrada
			</Text>
			<Text
				style={[
					typography.bodyLg,
					{ color: colors.gray500, textAlign: "center" },
				]}
			>
				Toque no botão + para adicionar a primeira lavoura a esta sede
			</Text>
		</View>
	)
}
