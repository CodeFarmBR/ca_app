import { useRouter } from "expo-router"
import { ArrowLeft, Home, SettingsIcon, UserCircle2 } from "lucide-react-native"
import { Pressable, Text, View, type ViewProps } from "react-native"
import { useAuth } from "@/context/auth-context"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

type HeaderProps = ViewProps & {
	profileSetings?: boolean
	backToHomeIcon?: boolean
	backToLastPageIcon?: boolean
	headerTitle?: string
}

export function Header({
	profileSetings = false,
	backToHomeIcon = false,
	backToLastPageIcon = false,
	headerTitle = "",
	...rest
}: HeaderProps) {
	const { logout } = useAuth()
	const router = useRouter()

	return (
		<View style={styles.header} {...rest}>
			<View style={styles.titleView}>
				{profileSetings && (
					<Pressable onPress={() => logout()}>
						<UserCircle2 size={32} strokeWidth={1} />
					</Pressable>
				)}

				{backToHomeIcon && (
					<Pressable
						onPress={() => router.push("/(tabs)/home")}
						style={styles.icons}
					>
						<Home size={20} strokeWidth={1} />
					</Pressable>
				)}

				{backToLastPageIcon && (
					<Pressable onPress={() => router.back()} style={styles.icons}>
						<ArrowLeft size={20} strokeWidth={1} />
					</Pressable>
				)}

				{headerTitle && <Text style={typography.headingMd}>{headerTitle}</Text>}
			</View>
			<Pressable style={[styles.icons, styles.configIcon]}>
				<SettingsIcon color={colors.background} size={24} strokeWidth={1} />
			</Pressable>
		</View>
	)
}
