import AsyncStorage from "@react-native-async-storage/async-storage"
import JWT from "expo-jwt"
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react"

interface TokenResponse {
	access_token: string
	refresh_token: string
}

interface ProfileProps {
	id: string
	nome: string
	sub: string
	consultoria_id: number
}

interface AuthContextProps {
	isAuthenticated: boolean
	isLoading: boolean
	profile?: ProfileProps | null
	access_token: string | null
	login: (tokens: TokenResponse) => Promise<void>
	logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = async ({
	children,
}: {
	children: React.ReactNode
}) => {
	const secret_key = process.env.EXPO_PUBLIC_SECRET_KEY || ""

	const access_token = await AsyncStorage.getItem("access_token")
	const [isLoading, setIsLoading] = useState(true)
	const [profile, setProfile] = useState<ProfileProps | null>(null)

	// Deriva o estado de login diretamente do perfil. Menos estado para gerenciar!
	const isAuthenticated = !!profile

	const logout = useCallback(async () => {
		await AsyncStorage.multiRemove(["access_token", "refresh_token", "profile"])
		setProfile(null)
	}, [])

	const validateToken = useCallback(
		async (token: string) => {
			const decoded = JWT.decode(token, secret_key) as ProfileProps & {
				exp: number
			}
			if (decoded.exp * 1000 <= Date.now()) {
				return false
			}
			const storedProfile = await AsyncStorage.getItem("profile")
			if (storedProfile) {
				setProfile(JSON.parse(storedProfile))
				return true
			}
			return false
		},
		[secret_key]
	)

	useEffect(() => {
		const checkToken = async () => {
			try {
				const token = await AsyncStorage.getItem("access_token")
				if (token && !(await validateToken(token))) {
					await logout()
				}
			} catch (_e) {
				await logout()
			} finally {
				setIsLoading(false)
			}
		}
		checkToken()
	}, [logout, validateToken])

	const _login = async (tokens: TokenResponse) => {
		const decoded = JWT.decode(tokens.access_token, secret_key)
		const profileData = decoded as ProfileProps

		// Salva tudo de uma vez para garantir consistência
		await Promise.all([
			AsyncStorage.setItem("access_token", tokens.access_token),
			AsyncStorage.setItem("refresh_token", tokens.refresh_token),
			AsyncStorage.setItem("profile", JSON.stringify(profileData)),
		])

		setProfile(profileData)
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				isLoading,
				profile,
				access_token,
				login: _login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}
