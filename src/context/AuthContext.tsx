// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TokenResponse {
	access_token: string;
	refresh_token: string;
}

interface AuthContextProps {
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (tokens: TokenResponse) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
	isAuthenticated: false,
	isLoading: true,
	login: async () => {},
	logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkToken = async () => {
			const token = await AsyncStorage.getItem("access_token");
			setIsAuthenticated(!!token);
			setIsLoading(false);
			console.log("Check token!");
		};
		checkToken();
	}, []);

	const login = async (tokens: TokenResponse) => {
		await AsyncStorage.setItem("access_token", tokens.access_token);
		await AsyncStorage.setItem("refresh_token", tokens.refresh_token);
		console.log("Fiz o login!");

		setIsAuthenticated(true);
	};

	const logout = async () => {
		await AsyncStorage.removeItem("access_token");
		await AsyncStorage.removeItem("refresh_token");
		console.log("Fiz o logout!");
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
