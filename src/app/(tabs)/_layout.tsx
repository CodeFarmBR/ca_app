import { Tabs } from "expo-router";
import { CustomTabBar } from "@/components/tabs/navbar";

export default function TabsLayout() {
	return (
		<Tabs tabBar={(props) => <CustomTabBar {...props} />}>
			<Tabs.Screen
				name="home"
				options={{
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="visitas"
				options={{
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="culturas"
				options={{
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="calendario"
				options={{
					headerShown: false,
				}}
			/>
		</Tabs>
	);
}
