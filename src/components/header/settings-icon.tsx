import { SettingsIcon as LucideSettingsIcon } from "lucide-react-native"
import { Pressable, View } from "react-native"
import { colors } from "@/themes/colors"
import { styles } from "./styles"

export default function SettingsIcon() {
	return (
		<View style={styles.configIcon}>
			<Pressable
				onPress={() => {
					return
				}}
			>
				<LucideSettingsIcon
					color={colors.background}
					size={20}
					strokeWidth={1}
				/>
			</Pressable>
		</View>
	)
}
