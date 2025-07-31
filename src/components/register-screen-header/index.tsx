import { Link } from "expo-router"
import { House } from "lucide-react-native"
import { Text, type TextProps, View } from "react-native"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

type Props = TextProps & {
	title: string
}

export function RegisterScreenHeader({ title = "", ...rest }: Props) {
	return (
		<View style={styles.container}>
			<Link href={"/(tabs)/home"}>
				<House size={32} />
			</Link>
			<Text style={typography.headingMd} {...rest}>
				Cadastrar {title}
			</Text>
		</View>
	)
}
