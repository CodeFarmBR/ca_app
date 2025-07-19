import { Tabs } from "expo-router";
// import { ClipboardPen, House } from "lucide-react-native";
import { CustomTabBar } from "@/components/home/tabs/navbar";
// import { colors } from "@/theme/colors";

export default function TabsLayout() {
	return (
		<Tabs tabBar={(props) => <CustomTabBar {...props} />}>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					// tabBarIcon: () => <House color={colors.green500} size={24} />,
				}}
			/>
			<Tabs.Screen
				name="visitas"
				options={{
					title: "Visitas",
					// tabBarIcon: ({ color }) => <ClipboardPen color={color} />,
				}}
			/>
			<Tabs.Screen
				name="culturas"
				options={{
					title: "Culturas",
					// tabBarIcon: ({ color }) => <ClipboardPen color={color} />,
				}}
			/>
			<Tabs.Screen
				name="calendario"
				options={{
					title: "Calendario",
					// tabBarIcon: ({ color }) => <ClipboardPen color={color} />,
				}}
			/>
		</Tabs>
	);
}
