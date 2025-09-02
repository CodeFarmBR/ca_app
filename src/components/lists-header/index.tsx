import { Link, type LinkProps } from "expo-router"
import { CirclePlus } from "lucide-react-native"
import { Text, View } from "react-native"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

type ListHeaderProps = {
	titleHeader: string
	pagePath: string
}

export function ListsHeader({ titleHeader, pagePath }: ListHeaderProps) {
	const href = pagePath as LinkProps["href"]

	return (
		<View style={styles.headerList}>
			<Text style={[typography.headingXs, styles.titleHeaderList, {}]}>
				{titleHeader}
			</Text>
			<Link href={href}>
				<CirclePlus strokeWidth={1} />
			</Link>
		</View>
	)
}
