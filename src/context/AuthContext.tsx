import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from "expo-jwt";

interface TokenResponse {
	access_token: string;
	refresh_token: string;
}

interface ProfileProps {
	id: string;
	nome: string;
	sub: string;
}

interface AuthContextProps {
	isAuthenticated: boolean;
	isLoading: boolean;
	profile?: ProfileProps | null;
	login: (tokens: TokenResponse) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const secret_key = process.env.EXPO_PUBLIC_SECRET_KEY;

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const [profile, setProfile] = useState<ProfileProps | null>(null);

	useEffect(() => {
		const checkToken = async () => {
			const token = await AsyncStorage.getItem("access_token");
			setIsAuthenticated(!!token);
			setIsLoading(false);

			const storedProfile = await AsyncStorage.getItem("profile");

			if (storedProfile) {
				setProfile(JSON.parse(storedProfile));
			}
		};
		checkToken();
	}, []);

	useEffect(() => {
		const setProfileData = async () => {
			if (profile) {
				await AsyncStorage.setItem("profile", JSON.stringify(profile));
			}
		};
		setProfileData();
	}, [profile]);

	const login = async (tokens: TokenResponse) => {
		await AsyncStorage.setItem("access_token", tokens.access_token);
		await AsyncStorage.setItem("refresh_token", tokens.refresh_token);

		try {
			const decoded = JWT.decode(tokens.access_token, secret_key || "");

			const profileData = decoded as ProfileProps;
			setProfile(profileData);
		} catch (error) {
			console.warn("Erro ao decodificar token:", error);
		}
		setIsAuthenticated(true);
	};

	const logout = async () => {
		await AsyncStorage.removeItem("access_token");
		await AsyncStorage.removeItem("refresh_token");
		await AsyncStorage.removeItem("profile");
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, isLoading, profile, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
