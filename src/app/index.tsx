import { View, Text, StyleSheet, Button } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppWindow } from "lucide-react-native";

import { loginSchema, type LoginFormData } from "@/schemas/loginSchema";
import { Input } from "@/components/input";
import { MyButton } from "@/components/button";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { MsIcon } from "../../assets/MsIcon";

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
				App Consultoria Agrícola
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
										placeholderTextColor={colors.gray300}
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
												{ color: colors.red400, fontWeight: "700" },
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
										placeholderTextColor={colors.gray300}
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
												{ color: colors.red400, fontWeight: "700" },
											]}
										>
											{errors.password.message}
										</Text>
									)}
								</View>
							)}
						/>
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

					<MyButton secundary activeOpacity={0.8}>
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
	titleBtn: {
		fontSize: 16,
		fontWeight: "bold",
	},
});
