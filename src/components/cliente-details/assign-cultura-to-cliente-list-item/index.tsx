import { Calendar as CalendarIcon, CirclePlus } from "lucide-react-native"
import { Pressable, Text, TextInput, View } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

type ItemProps = {
	nome: string
	variedade: string
}

export function AssignCulturaToClienteListItem({ nome, variedade }: ItemProps) {
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

				<Pressable>
					<CirclePlus color={colors.green500} size={32} strokeWidth={1} />
				</Pressable>
			</View>

			<View style={styles.datePickersContainer}>
				<View style={styles.datePickerField}>
					<Text style={typography.bodySm}>Data início:</Text>
					<View style={styles.datePickerInput}>
						<CalendarIcon color={colors.gray500} size={24} strokeWidth={1} />
						<TextInput placeholder="DD/MM/AAAA" />
					</View>
				</View>

				<View style={styles.datePickerField}>
					<Text style={typography.bodySm}>Data fim:</Text>
					<View style={styles.datePickerInput}>
						<CalendarIcon color={colors.gray500} size={24} strokeWidth={1} />
						<TextInput placeholder="DD/MM/AAAA" />
					</View>
				</View>
			</View>
		</View>
	)
}
