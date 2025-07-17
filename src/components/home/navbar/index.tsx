import { Calendar1, ClipboardPen, House, Wheat } from "lucide-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { colors } from "@/theme/colors";
import { styles } from "./styles";

type handleNavigateParameters = React.Dispatch<React.SetStateAction<boolean>>;

export default function Navbar() {
	const [homeClientesScreen, setHomeClientesScreen] = useState(false);
	const [homeVisitasScreen, setHomeVisitasScreen] = useState(false);
	const [homeCulturasScreen, setHomeCulturasScreen] = useState(false);
	const [homeCalendarioScreen, setHomeCalendarioScreen] = useState(false);

	function handleNavigate(setNavbarItem: handleNavigateParameters) {
		setNavbarItem(true);
		console.log("navegou");
	}

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.navbarItem,
					homeClientesScreen && styles.navbarItemSelected,
				]}
			>
				<Pressable onPress={() => handleNavigate(setHomeClientesScreen)}>
					<House color={colors.background} strokeWidth={1} />
				</Pressable>
			</View>

			<View
				style={[
					styles.navbarItem,
					homeVisitasScreen && styles.navbarItemSelected,
				]}
			>
				<Pressable onPress={() => handleNavigate(setHomeVisitasScreen)}>
					<ClipboardPen color={colors.background} strokeWidth={1} />
				</Pressable>
			</View>

			<View
				style={[
					styles.navbarItem,
					homeCulturasScreen && styles.navbarItemSelected,
				]}
			>
				<Pressable onPress={() => handleNavigate(setHomeCulturasScreen)}>
					<Wheat color={colors.background} strokeWidth={1} />
				</Pressable>
			</View>

			<View
				style={[
					styles.navbarItem,
					homeCalendarioScreen && styles.navbarItemSelected,
				]}
			>
				<Pressable onPress={() => handleNavigate(setHomeCalendarioScreen)}>
					<Calendar1 color={colors.background} strokeWidth={1} />
				</Pressable>
			</View>
		</View>
	);
}
