import { Link } from "expo-router"
import { Pressable, Text, View } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { FarmIcon } from "../../../../assets/farm-icon"
import { styles } from "./styles"

type FazendaProps = {
	fazenda_id: number
	nome: string
	localizacao: string
}

export function FazendasListItem({
	fazenda_id,
	nome,
	localizacao,
}: FazendaProps) {
	return (
		<Link
			asChild
			href={{ pathname: "/fazenda/[fazenda_id]", params: { fazenda_id } }}
		>
			<Pressable style={styles.fazendaListItem}>
				<View style={styles.fazendaListItemImage}>
					<FarmIcon />
				</View>
				<View style={styles.fazendaListItemInfo}>
					<Text numberOfLines={2} style={[typography.bodyMd]}>
						{nome}
					</Text>
					<Text
						numberOfLines={1}
						style={[typography.bodySm, { color: colors.gray500 }]}
					>
						{localizacao}
					</Text>
				</View>
			</Pressable>
		</Link>
	)
}
