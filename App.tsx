import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded] = useFonts({
		Raleway: require("./assets/fonts/Raleway-VariableFont_wght.ttf"),
		NotoSans: require("./assets/fonts/NotoSans-VariableFont_wght.ttf"),
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
