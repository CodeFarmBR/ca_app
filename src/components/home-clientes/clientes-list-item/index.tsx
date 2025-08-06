import { Link } from "expo-router"
import { Ellipsis } from "lucide-react-native"
import { Pressable, Text, View } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

export type ItemProps = {
	cliente_id: string
	nome: string
	empresa: string
}

export function ClientesListItem({ cliente_id, nome, empresa }: ItemProps) {
	return (
		<Link
			asChild
			href={{ pathname: "/(cliente)/[cliente_id]", params: { cliente_id } }}
		>
			<Pressable>
				<View style={styles.container}>
					<View>
						<Text style={[typography.bodyLg, { color: colors.gray900 }]}>
							{nome}
						</Text>
						<Text style={[typography.bodyMd, { color: colors.gray500 }]}>
							{empresa}
						</Text>
					</View>
					<Ellipsis />
				</View>
			</Pressable>
		</Link>
	)
}
