import { Link } from "expo-router"
import { CirclePlus } from "lucide-react-native"
import { Text, View } from "react-native"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

type ListHeaderProps = {
	titleHeader: string
	pagePath: `/${string}`
}

export function ListsHeader({ titleHeader, pagePath }: ListHeaderProps) {
	return (
		<View style={styles.headerList}>
			<Text style={[typography.headingXs, styles.titleHeaderList, {}]}>
				{titleHeader}
			</Text>
			<Link href={pagePath}>
				<CirclePlus strokeWidth={1} />
			</Link>
		</View>
	)
}
