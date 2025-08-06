import { UserCircle2 } from "lucide-react-native"
import { Pressable, View } from "react-native"
import { useAuth } from "@/context/auth-context"

export default function ProfileIcon() {
	const { logout } = useAuth()

	return (
		<View>
			<Pressable onPress={() => logout()}>
				<UserCircle2 size={32} strokeWidth={1} />
			</Pressable>
		</View>
	)
}
