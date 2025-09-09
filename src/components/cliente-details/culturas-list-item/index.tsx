import { Ellipsis, Wheat } from "lucide-react-native"
import { Pressable, Text, View } from "react-native"
import { colors } from "@/themes/colors"
import { globalStyles } from "@/themes/global-styles"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

type CulturaProps = {
	nome: string
	variedade: string
	dataInicio: string
	dataFim: string
}

export function CulturasListItem({
	nome,
	variedade,
	dataInicio,
	dataFim,
}: CulturaProps) {
	return (
		<View style={styles.culturasListItem}>
			<View style={globalStyles.culturaDefaultImage}>
				<Wheat color={colors.gray300} size={18} strokeWidth={1} />
			</View>

			<View style={{ flex: 1 }}>
				<View style={styles.culturaInfo}>
					<Text style={[typography.bodySm, { color: colors.gray500 }]}>
						<Text style={{ color: colors.gray900, fontWeight: "700" }}>
							{nome}
						</Text>{" "}
						- {variedade}
					</Text>
				</View>
				<Text style={[typography.bodySm, { color: colors.gray500 }]}>
					{dataInicio} - {dataFim}
				</Text>
			</View>

			<Pressable>
				<Ellipsis color={colors.gray900} />
			</Pressable>
		</View>
	)
}
