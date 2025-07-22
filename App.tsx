import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function App() {
	const [fontsLoaded] = useFonts({
		RalewayBold: require("./assets/fonts/Raleway-Bold.ttf"),
		RalewayRegular: require("./assets/fonts/Raleway-Regular.ttf"),
		NotoSans: require("./assets/fonts/NotoSans-VariableFont_wght.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}

	return <Stack />;
}
