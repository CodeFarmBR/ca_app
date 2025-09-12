import { CirclePlus } from "lucide-react-native"
import { Pressable, Text, View } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

type PropertyInfoProps = {
	nome?: string
	listHeader: string
}

export function PropertyInfo({ nome, listHeader }: PropertyInfoProps) {
	return (
		<View style={styles.fazendaInfo}>
			<Text style={typography.headingMd}>{nome}</Text>
			<Text style={typography.headingXs}>{listHeader}</Text>
			<Pressable style={styles.addSedeIcon}>
				<CirclePlus color={colors.background} size={32} strokeWidth={1} />
			</Pressable>
		</View>
	)
}
