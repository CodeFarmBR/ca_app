import type { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { Calendar1, ClipboardPen, Home, Wheat } from "lucide-react-native"
import { Pressable, View } from "react-native"
import { colors } from "@/themes/colors"
import { styles } from "./styles"

function HomeIcon({ isFocused }: { isFocused: boolean }) {
	return (
		<Home
			color={isFocused ? colors.green500 : colors.background}
			size={28}
			strokeWidth={1}
		/>
	)
}

function VisitasIcon({ isFocused }: { isFocused: boolean }) {
	return (
		<ClipboardPen
			color={isFocused ? colors.green500 : colors.background}
			size={28}
			strokeWidth={1}
		/>
	)
}

function CulturasIcon({ isFocused }: { isFocused: boolean }) {
	return (
		<Wheat
			color={isFocused ? colors.green500 : colors.background}
			size={28}
			strokeWidth={1}
		/>
	)
}

function CalendarioIcon({ isFocused }: { isFocused: boolean }) {
	return (
		<Calendar1
			color={isFocused ? colors.green500 : colors.background}
			size={28}
			strokeWidth={1}
		/>
	)
}

export function CustomTabBar({
	state,
	descriptors,
	navigation,
}: BottomTabBarProps) {
	return (
		<View style={styles.tabBarContainer}>
			<View style={styles.tabBar}>
				{state.routes.map((route, index) => {
					// biome-ignore lint/correctness/noUnusedVariables: I think may e useful for some reason
					const { options } = descriptors[route.key]
					const isFocused = state.index === index // Verifica se a aba está ativa

					const onPress = () => {
						const event = navigation.emit({
							type: "tabPress",
							target: route.key,
							canPreventDefault: true,
						})

						if (!(isFocused || event.defaultPrevented)) {
							navigation.navigate(route.name, route.params)
						}
					}

					return (
						<Pressable
							accessibilityRole="button"
							accessibilityState={isFocused ? { selected: true } : {}}
							key={route.key}
							onPress={onPress}
							style={[styles.tabItem, isFocused ? styles.tabItemFocused : null]}
						>
							{route.name === "index" && <HomeIcon isFocused={isFocused} />}
							{route.name === "visitas" && (
								<VisitasIcon isFocused={isFocused} />
							)}
							{route.name === "culturas" && (
								<CulturasIcon isFocused={isFocused} />
							)}
							{route.name === "calendario" && (
								<CalendarioIcon isFocused={isFocused} />
							)}
						</Pressable>
					)
				})}
			</View>
		</View>
	)
}
