import { SettingsIcon, UserCircle2 } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { styles } from "./styles";

export default function Header() {
	const { logout } = useAuth();

	return (
		<View style={styles.header}>
			<View style={styles.titleView}>
				<Pressable onPress={() => logout()}>
					<UserCircle2 size={32} strokeWidth={1} />
				</Pressable>
				<Text style={typography.headingMd}>Olá, Consultor</Text>
			</View>
			<View style={styles.configIcon}>
				<SettingsIcon color={colors.background} size={20} strokeWidth={1} />
			</View>
		</View>
	);
}
