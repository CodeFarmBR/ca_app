import { Text, View } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { AssignCulturaToClienteForm } from "../assign-cultura-to-cliente-form"
import { styles } from "./styles"

type ItemProps = {
	cliente_id: string
	cultura_id: number
	nome: string
	variedade: string
}

export function AssignCulturaToClienteListItem({
	cliente_id,
	cultura_id,
	nome,
	variedade,
}: ItemProps) {
	return (
		<View style={styles.container}>
			<View style={styles.submitButtonContainer}>
				<View style={styles.culturaInfoContainer}>
					<View style={styles.badgeCultura}>
						<Text style={[typography.bodyLgBold, { color: colors.background }]}>
							{nome}
						</Text>
					</View>
					<Text style={typography.bodyMd}>{variedade}</Text>
				</View>
			</View>

			<AssignCulturaToClienteForm
				cliente_id={cliente_id}
				cultura_id={cultura_id}
			/>
		</View>
	)
}
