import {
	useFonts,
	Raleway_500Medium,
	Raleway_600SemiBold,
	Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import {
	NotoSans_300Light,
	NotoSans_400Regular,
} from "@expo-google-fonts/noto-sans";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { typography } from "@/theme/typography";

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded] = useFonts({
		Raleway_500Medium,
		Raleway_600SemiBold,
		Raleway_700Bold,
		NotoSans_300Light,
		NotoSans_400Regular,
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) return null;

	return (
		<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
			<Slot />
		</View>
	);
}
