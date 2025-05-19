import { View, Text, StyleSheet, Button } from "react-native";

import { Input } from "@/components/input";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/schemas/loginSchema";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { MyButton } from "@/components/button";

export default function LoginScreen() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	function handleLogin(data: LoginFormData) {
		console.log("Dados do formulário:", data);
	}

	return (
		<View style={styles.base}>
			<Text style={[typography.headingLg, { color: colors.gray900 }]}>
				Nome do App
			</Text>

			<View style={{ width: "100%", gap: 8 }}>
				<View style={styles.container}>
					<View style={styles.login}>
						<Controller
							control={control}
							name="email"
							render={({ field: { onChange, value, onBlur } }) => (
								<View style={{ gap: 4 }}>
									<Input
										placeholder="E-mail"
										keyboardType="email-address"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										error={!!errors.email}
									/>
									{errors.email && (
										<Text
											style={[
												typography.bodyMd,
												{ color: colors.red400, fontWeight: "600" },
											]}
										>
											{errors.email.message}
										</Text>
									)}
								</View>
							)}
						/>

						<Controller
							control={control}
							name="password"
							render={({ field: { onChange, value, onBlur } }) => (
								<View style={{ gap: 4 }}>
									<Input
										placeholder="Senha"
										secure
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										error={!!errors.password}
									/>
									{errors.password && (
										<Text
											style={[
												typography.bodyMd,
												{ color: colors.red400, fontWeight: "600" },
											]}
										>
											{errors.password.message}
										</Text>
									)}
								</View>
							)}
						/>
						<MyButton title="Entrar" onPress={handleSubmit(handleLogin)} />
					</View>

					<Text style={[typography.bodyLg, { color: colors.gray900 }]}>
						Ou entre com:
					</Text>

					<MyButton title="Microsoft" />
				</View>

				<Text
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
});
