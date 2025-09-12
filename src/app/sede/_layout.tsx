import { Tabs } from "expo-router"
import { SedeDetailsScreenTabBar } from "@/components/sede-details/tab-bar"

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				headerShadowVisible: false,
			}}
			tabBar={(props) => <SedeDetailsScreenTabBar {...props} />}
		>
			<Tabs.Screen name="[sede_id]" />
			<Tabs.Screen name="mapa" />
			<Tabs.Screen name="visitas" />
		</Tabs>
	)
}
