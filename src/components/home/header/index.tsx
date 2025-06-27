import { useAuth } from "@/context/AuthContext";
import { SettingsIcon, UserCircle2 } from "lucide-react-native";
import { View, Text } from "react-native";
import { styles } from "./styles";

export default function Header() {
	const { profile } = useAuth();

	return (
		<View style={styles.header}>
			<View style={styles.titleView}>
				<UserCircle2 width={32} height={32} strokeWidth={1} />
				<Text>Olá, {profile?.nome}</Text>
			</View>
			<View>
				<SettingsIcon width={32} height={32} strokeWidth={1} />
			</View>
		</View>
	);
}
