import { CirclePlus } from "lucide-react-native"
import { Pressable, Text, View } from "react-native"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

type Props = {
	titleHeader: string
	onAddPress: () => void
}

export function ListsHeader({ titleHeader, onAddPress }: Props) {
	return (
		<View style={styles.headerList}>
			<Text style={[typography.headingXs, styles.titleHeaderList, {}]}>
				{titleHeader}
			</Text>
			<Pressable onPress={onAddPress}>
				<CirclePlus strokeWidth={1} />
			</Pressable>
		</View>
	)
}
