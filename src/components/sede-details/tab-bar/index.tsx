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
	navigation,
}: BottomTabBarProps) {
	const tabBarRoutes = state.routes.filter(
		(route) => route.name !== "lavoura-registration"
	)
	// console.log(state.routes)

	return (
		<View style={styles.tabBarContainer}>
			<View style={styles.tabBar}>
				{tabBarRoutes.map((route) => {
					const originalRouteIndex = state.routes.findIndex(
						(r) => r.key === route.key
					)
					const isFocused = state.index === originalRouteIndex // Verifica se a aba está ativa

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
