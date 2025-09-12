import { Link, type LinkProps } from "expo-router"
import { CirclePlus } from "lucide-react-native"
import { Text, View } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

type PropertyInfoProps = {
	nome?: string
	listHeader: string
	pagePath: string
}

export function PropertyInfo({
	nome,
	listHeader,
	pagePath,
}: PropertyInfoProps) {
	const href = pagePath as LinkProps["href"]

	return (
		<View style={styles.fazendaInfo}>
			<Text style={typography.headingMd}>{nome}</Text>
			<Text style={typography.headingXs}>{listHeader}</Text>
			<Link href={href} style={styles.addSedeIcon}>
				<CirclePlus color={colors.background} size={32} strokeWidth={1} />
			</Link>
		</View>
	)
}
