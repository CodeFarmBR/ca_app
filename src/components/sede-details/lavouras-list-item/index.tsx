import { Link } from "expo-router"
import { Wheat } from "lucide-react-native"
import { Text, View } from "react-native"
import { dayjs } from "@/lib/dayjs"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { AtribuirCulturaButton } from "../atribuir-cultura-button"
import { styles } from "./styles"

type ItemProps = {
	lavouraId: number
	nomeLavoura: string
	currentCultura:
		| {
				data_inicio: string
				data_fim: string
				cultura: {
					nome: string
					variedade: string
				}
		  }
		| null
		| undefined
}

export function LavourasListItem({
	lavouraId,
	nomeLavoura,
	currentCultura,
}: ItemProps) {
	const dataInicio = dayjs(currentCultura?.data_inicio).format("DD/MM/YYYY")
	const dataFim = dayjs(currentCultura?.data_fim).format("DD/MM/YYYY")

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

						{currentCultura && (
							<Text style={[typography.bodyMd, { color: colors.gray500 }]}>
								{" "}
								- {currentCultura?.cultura.nome}
							</Text>
						)}
					</View>

					{currentCultura ? (
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

				{currentCultura ? (
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
