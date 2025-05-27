import { View, Text, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "@/schemas/loginSchema";
import { Input } from "@/components/input";
import { MyButton } from "@/components/button";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { MsIcon } from "../../assets/MsIcon";
import { useMutation } from "@tanstack/react-query";
import { login, type TokenResponse } from "@/http/auth/login";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { getRedirectUri } from "@/auth/microsoftLogin";

export default function Login() {
	const router = useRouter();

	const auth = useAuth();

	const { mutate, error, isPending } = useMutation({
		mutationFn: login,
		onSuccess: async (tokens) => {
			// Salva tokens no cliente
			await auth.login(tokens);
			console.log("Tokens recebidos:", tokens);
			router.replace("/dashboard");
		},
		onError: (error: Error) => {
			alert(error?.message);
		},
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	function handleLogin({ email, senha }: { email: string; senha: string }) {
		mutate({ email, senha });
	}

	const handleMicrosoftLogin = () => {
		const redirectUri = getRedirectUri();
		// aqui você inicia o fluxo OAuth com o redirectUri
	};

	return (
		<View style={styles.base}>
			<Text style={[typography.headingLg, { color: colors.gray900 }]}>
				App Consultoria Agrícola
			</Text>

			<View style={{ width: "100%", gap: 8 }}>
				<View style={styles.container}>
					<View style={styles.login}>
						{/* Input Email */}
						<View style={styles.input}>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								name="email"
								render={({ field: { onChange, value, onBlur } }) => (
									<Input
										placeholder="E-mail"
										placeholderTextColor={colors.gray300}
										keyboardType="email-address"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										error={!!errors.email}
									/>
								)}
							/>
							{errors.email && (
								<Text
									style={[
										typography.bodyMd,
										{ color: colors.red400, fontWeight: "700" },
									]}
								>
									{errors.email.message}
								</Text>
							)}
						</View>

						{/* Input Senha */}
						<View style={styles.input}>
							<Controller
								control={control}
								name="senha"
								render={({ field: { onChange, value, onBlur } }) => (
									<Input
										placeholder="Senha"
										placeholderTextColor={colors.gray300}
										secure
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										error={!!errors.senha}
									/>
								)}
							/>
							{errors.senha && (
								<Text
									style={[
										typography.bodyMd,
										{ color: colors.red400, fontWeight: "700" },
									]}
								>
									{errors.senha.message}
								</Text>
							)}
						</View>

						<MyButton
							primary
							onPress={handleSubmit(handleLogin)}
							activeOpacity={0.8}
						>
							<Text style={[styles.titleBtn, { color: colors.background }]}>
								Entrar
							</Text>
						</MyButton>
					</View>

					<Text style={[typography.bodyLg, { color: colors.gray900 }]}>
						Ou entre com:
					</Text>

					<MyButton
						secundary
						activeOpacity={0.8}
						onPress={handleMicrosoftLogin}
					>
						<Text style={[styles.titleBtn, { color: colors.green500 }]}>
							Microsoft
						</Text>
						<MsIcon />
					</MyButton>
				</View>

				<Text // @todo - Must be a link
					style={[
						typography.bodyMd,
						{ color: colors.gray900, textDecorationLine: "underline" },
					]}
				>
					Esqueci minha senha
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	base: {
		flex: 1,
		width: "100%",
		padding: 32,
		backgroundColor: colors.background,
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 200,
	},
	container: {
		width: "100%",
		alignItems: "center",
		gap: 16,
	},
	login: {
		width: "100%",
		gap: 12,
	},
	input: {
		gap: 4,
	},
	titleBtn: {
		fontSize: 16,
		fontWeight: "bold",
	},
});
