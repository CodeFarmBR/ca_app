import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, Text, View } from "react-native"
import { MsIcon } from "@/../assets/MsIcon"
import { MyButton } from "@/components/button"
import { Input } from "@/components/input"
import { useAuth } from "@/context/auth-context"
import { login } from "@/http/auth/login"
import { type LoginFormData, loginSchema } from "@/http/types/login-request"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"

export default function LoginScreen() {
	const router = useRouter()

	const auth = useAuth()

	const { mutate } = useMutation({
		mutationFn: login,
		onSuccess: async (tokens) => {
			// Salva tokens no cliente
			await auth.login(tokens)
			router.replace("/home")
		},
		onError: (error: Error) => {
			alert(`Erro de login: ${error?.message}`)
		},
	})

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			senha: "",
		},
	})

	function handleLogin({ email, senha }: { email: string; senha: string }) {
		mutate({ email, senha })
	}

	const handleMicrosoftLogin = () => {
		// const redirectUri = getRedirectUri();
		// @todo - inicia o fluxo OAuth com o redirectUri
	}

	return (
		<View style={styles.base}>
			<Text style={[typography.headingXl, { color: colors.gray900 }]}>
				App Consultoria Agrícola
			</Text>

			<View style={{ width: "100%", gap: 8 }}>
				<View style={styles.container}>
					<View style={styles.login}>
						{/* Input Email */}
						<View style={styles.input}>
							<Controller
								control={control}
								name="email"
								render={({ field: { onChange, value, onBlur } }) => (
									<Input
										error={!!errors.email}
										keyboardType="email-address"
										onBlur={onBlur}
										onChangeText={onChange}
										placeholder="E-mail"
										placeholderTextColor={colors.gray300}
										value={value}
									/>
								)}
								rules={{
									required: true,
								}}
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
										error={!!errors.senha}
										onBlur={onBlur}
										onChangeText={onChange}
										placeholder="Senha"
										placeholderTextColor={colors.gray300}
										secure
										value={value}
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

						<MyButton onPress={handleSubmit(handleLogin)} primary>
							<Text style={[styles.titleBtn, { color: colors.background }]}>
								Entrar
							</Text>
						</MyButton>
					</View>

					<Text style={[typography.bodyLg, { color: colors.gray900 }]}>
						Ou entre com:
					</Text>

					<MyButton
						activeOpacity={0.6}
						onPress={handleMicrosoftLogin}
						secundary
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
	)
}

const styles = StyleSheet.create({
	base: {
		flex: 1,
		width: "100%",
		paddingHorizontal: 32,
		paddingVertical: 64,
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
})
