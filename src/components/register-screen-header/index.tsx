import { useRouter } from "expo-router"
import { House } from "lucide-react-native"
import { Pressable, Text, type TextProps, View } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { BackToLastPageIcon } from "../../../assets/back-to-last-page-icon"
import { styles } from "./styles"

type Props = TextProps & {
	title: string
	backToHomePage?: boolean
}

export function RegisterScreenHeader({
	title = "",
	backToHomePage = false,
	...rest
}: Props) {
	const router = useRouter()

	return (
		<View style={styles.container}>
			<Pressable
				onPress={() => {
					router.back()
				}}
			>
				{backToHomePage ? (
					<House color={colors.gray900} size={32} strokeWidth={1} />
				) : (
					<BackToLastPageIcon />
				)}
			</Pressable>
			<Text style={typography.headingMd} {...rest}>
				{title}
			</Text>
		</View>
	)
}
