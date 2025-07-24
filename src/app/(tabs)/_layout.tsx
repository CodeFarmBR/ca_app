import { Redirect, Tabs } from "expo-router"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import UserIcon from "@/components/header/profile-icon"
import SettingsIcon from "@/components/header/settings-icon"
import { CustomTabBar } from "@/components/tabs/navbar"
import { useAuth } from "@/context/auth-context"
import { colors } from "@/themes/colors"

export default function TabsLayout() {
	const { isAuthenticated } = useAuth()

	const insets = useSafeAreaInsets()

	if (!isAuthenticated) {
		// Se o usuário NÃO está autenticado, não o deixe ver as telas principais.
		// Redirecione-o para o login.
		return <Redirect href="/login" />
	}

	return (
		<Tabs
			screenOptions={{
				// Este é o header compartilhado para todas as abas
				headerShown: true,
				headerTitle: "Olá, Consultor",
				headerTitleAlign: "left",
				headerStyle: {
					backgroundColor: colors.background,
				},
				headerTitleStyle: {
					fontSize: 24,
					fontWeight: "700",
					color: colors.gray900,
				},
				headerLeft: () => (
					<View style={{ paddingRight: 8 }}>
						<UserIcon />
					</View>
				),
				headerLeftContainerStyle: {
					paddingLeft: insets.left + 16,
				},
				headerRight: () => (
					<View>
						<SettingsIcon />
					</View>
				),
				headerRightContainerStyle: {
					paddingRight: insets.right + 16,
				},
				headerShadowVisible: false,
			}}
			tabBar={(props) => <CustomTabBar {...props} />}
		>
			<Tabs.Screen name="home" />
			<Tabs.Screen name="visitas" />
			<Tabs.Screen name="culturas" />
			<Tabs.Screen name="calendario" />
		</Tabs>
	)
}
