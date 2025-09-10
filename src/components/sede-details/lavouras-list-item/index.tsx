import { Wheat } from "lucide-react-native"
import { Text, View } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

type ItemProps = {
	nomeLavoura: string
	nomeCultura: string
	dataInicio: string | null
	dataFim: string | null
}

export function LavourasListItem({
	nomeCultura,
	nomeLavoura,
	dataFim,
	dataInicio,
}: ItemProps) {
	return (
		<View style={styles.listItemContainer}>
			<View>
				<View style={styles.lavouraInfoContainer}>
					<Text style={typography.headingXsBold}>{nomeLavoura}</Text>
					{nomeCultura ? (
						<Text style={[typography.bodyMd, { color: colors.gray500 }]}>
							{" "}
							- {nomeCultura}
						</Text>
					) : (
						""
					)}
				</View>

				{dataInicio && dataFim ? (
					<View style={styles.lavouraInfoContainer}>
						<Text style={[typography.bodyMd, { color: colors.gray500 }]}>
							{dataInicio}
						</Text>
						<Text style={[typography.bodyMd, { color: colors.gray500 }]}>
							{" "}
							- {dataFim}
						</Text>
					</View>
				) : (
					<Text style={[typography.bodyMd, { color: colors.gray300 }]}>
						Sem cultura atribuída
					</Text>
				)}
			</View>

			{nomeCultura ? (
				<View style={styles.culturaDefaultImage}>
					<Wheat color={colors.gray300} size={18} strokeWidth={1} />
				</View>
			) : (
				""
			)}
		</View>
	)
}
