import { Ellipsis } from "lucide-react-native"
import { Text, View } from "react-native"
import { colors } from "@/themes/colors"
import { styles } from "./styles"

export function SedeListItem() {
	return (
		<View style={styles.listItemContainer}>
			<View style={styles.listItemInfo}>
				<View>
					<Text>Sede 1</Text>
					<Text>Getfix Soluções Tecnológicas</Text>
				</View>

				<Ellipsis color={colors.gray900} />
			</View>
		</View>
	)
}
