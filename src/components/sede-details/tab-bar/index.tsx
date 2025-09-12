import type { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { ClipboardList, Map as MapIcon } from "lucide-react-native"
import { Pressable, View } from "react-native"
import { colors } from "@/themes/colors"
import { BuildingOfficeIcon as BuildingOffice } from "../../../../assets/building-office-icon"
import { styles } from "./styles"

function BuildingOfficeIcon({ isFocused }: { isFocused: boolean }) {
	return (
		<BuildingOffice
			height={28}
			pathFill={isFocused ? colors.green500 : colors.background}
			width={28}
		/>
	)
}

function VisitasIcon({ isFocused }: { isFocused: boolean }) {
	return (
		<ClipboardList
			color={isFocused ? colors.green500 : colors.background}
			size={28}
			strokeWidth={1}
		/>
	)
}

function MapaIcon({ isFocused }: { isFocused: boolean }) {
	return (
		<MapIcon
			// Cor do ícone indicando que ele está desabilitado
			color={isFocused ? colors.green500 : colors.gray300}
			size={28}
			strokeWidth={1}
		/>
	)
}

export function SedeDetailsScreenTabBar({
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
							// Página de mapas desabilitada (@todo)
							disabled={route.name === "mapa"}
							key={route.key}
							onPress={onPress}
							style={[styles.tabItem, isFocused ? styles.tabItemFocused : null]}
						>
							{route.name === "[sede_id]" && (
								<BuildingOfficeIcon isFocused={isFocused} />
							)}
							{route.name === "mapa" && <MapaIcon isFocused={isFocused} />}
							{route.name === "visitas" && (
								<VisitasIcon isFocused={isFocused} />
							)}
						</Pressable>
					)
				})}
			</View>
		</View>
	)
}
