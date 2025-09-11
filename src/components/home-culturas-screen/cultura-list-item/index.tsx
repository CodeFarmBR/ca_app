import { Link } from "expo-router"
import { Ellipsis } from "lucide-react-native"
import { Pressable, Text, View } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

export type CulturaItemProps = {
	cultura_id: number
	nome: string
	variedade: string
}

export function CulturaListItem({
	cultura_id,
	nome,
	variedade,
}: CulturaItemProps) {
	return (
		<Link
			asChild
			disabled // funcionalidade não definida até o momento
			href={{ pathname: "/cultura/[cultura_id]", params: { cultura_id } }}
		>
			<Pressable>
				<View style={styles.container}>
					<View>
						<Text style={[typography.bodyLg, { color: colors.gray900 }]}>
							{nome}
						</Text>
						<Text style={[typography.bodyMd, { color: colors.gray500 }]}>
							{variedade}
						</Text>
					</View>
					<Ellipsis />
				</View>
			</Pressable>
		</Link>
	)
}
