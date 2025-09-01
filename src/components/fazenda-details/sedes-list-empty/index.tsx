import { Text, View } from "react-native"
import { colors } from "@/themes/colors"
import { globalStyles } from "@/themes/global-styles"
import { typography } from "@/themes/typography"
import { BuildingOfficeIcon } from "../../../../assets/building-office-icon"

export function SedesListEmpty() {
	return (
		<View style={[globalStyles.emptyLists, { marginTop: 120 }]}>
			<BuildingOfficeIcon />
			<Text style={[typography.bodyLgBold, { color: colors.gray500 }]}>
				Nenhuma sede encontrada
			</Text>
			<Text
				style={[
					typography.bodyLg,
					{ color: colors.gray500, textAlign: "center" },
				]}
			>
				Toque no botão + para adicionar a primeira sede a esta fazenda
			</Text>
		</View>
	)
}
