import { Redirect, Tabs } from "expo-router"
import { Header } from "@/components/header"
import { CustomTabBar } from "@/components/tabs"
import { useAuth } from "@/context/auth-context"
import { colors } from "@/themes/colors"

export default function TabsLayout() {
	const { isAuthenticated } = useAuth()

	if (!isAuthenticated) {
		// Se o usuário NÃO está autenticado, não o deixe ver as telas principais.
		// Redirecione-o para o login.
		return <Redirect href="/login" />
	}

	return (
		<Tabs
			screenOptions={{
				// Este é o header compartilhado para todas as abas
				header: () => (
					<Header headerTitle="Olá consultor" homeHeader profileSetings />
				),
				headerShadowVisible: false,
				sceneStyle: { backgroundColor: colors.background },
			}}
			tabBar={(props) => <CustomTabBar {...props} />}
		>
			<Tabs.Screen name="index" />
			<Tabs.Screen name="visitas" />
			<Tabs.Screen name="culturas" />
			<Tabs.Screen name="calendario" />
		</Tabs>
	)
}
