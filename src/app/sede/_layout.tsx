import { Tabs } from "expo-router"
import { SedeDetailsScreenTabBar } from "@/components/sede-details/tab-bar"

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
			tabBar={(props) => {
				// Não mostrar a tabBar na tela de registro de lavoura
				const currentRouteName = props.state.routes[props.state.index].name
				if (currentRouteName === "lavoura-registration") {
					return null
				}
				return <SedeDetailsScreenTabBar {...props} />
			}}
		>
			<Tabs.Screen name="[sede_id]" />
			<Tabs.Screen name="mapa" />
			<Tabs.Screen name="visitas" />
			<Tabs.Screen
				name="lavoura-registration"
				options={{
					href: null,
				}}
			/>
		</Tabs>
	)
}
