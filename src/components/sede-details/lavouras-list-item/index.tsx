import { Link } from "expo-router"
import { Wheat } from "lucide-react-native"
import { Text, View } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { AtribuirCulturaButton } from "../atribuir-cultura-button"
import { styles } from "./styles"

type ItemProps = {
	lavouraId: number
	nomeLavoura: string
	nomeCultura: string
	dataInicio: string | null
	dataFim: string | null
}

export function LavourasListItem({
	lavouraId,
	nomeCultura,
	nomeLavoura,
	dataFim,
	dataInicio,
}: ItemProps) {
	return (
		<Link
			href={{
				pathname: "/lavoura/[lavoura_id]",
				params: { lavoura_id: lavouraId },
			}}
		>
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
					<AtribuirCulturaButton />
				)}
			</View>
		</Link>
	)
}
