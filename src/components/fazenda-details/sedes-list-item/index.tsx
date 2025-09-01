import { Link } from "expo-router"
import { Ellipsis } from "lucide-react-native"
import { Pressable, Text, View } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

type SedeProps = {
	sede_id: number
	nome: string
	localizacao: string
}

export function SedeListItem({ sede_id, nome, localizacao }: SedeProps) {
	return (
		<Link asChild href={{ pathname: "/sede/[sede_id]", params: { sede_id } }}>
			<Pressable style={styles.listItemContainer}>
				<View style={styles.listItemInfo}>
					<View>
						<Text style={typography.headingXsBold}>{nome}</Text>
						<Text style={[typography.bodySm, { color: colors.gray500 }]}>
							{localizacao}
						</Text>
					</View>

					<Ellipsis color={colors.gray900} />
				</View>
			</Pressable>
		</Link>
	)
}
