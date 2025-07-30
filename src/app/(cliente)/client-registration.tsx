import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MyButton } from "@/components/button"
import { Input } from "@/components/input"
import { ProtectedRoute } from "@/components/protected-route"
import { RegisterScreenHeader } from "@/components/register-screen-header"
import {
	type AddClienteFormData,
	addClienteSchema,
} from "@/http/types/add-cliente-request"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"

export default function ClientRegistrationScreen() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<AddClienteFormData>({
		resolver: zodResolver(addClienteSchema),
	})

	return (
		<ProtectedRoute>
			<SafeAreaView style={styles.container}>
				<RegisterScreenHeader title="Cliente" />

				<View style={styles.form}>
					<View style={styles.inputs}>
						{/* Input Nome */}
						<View style={styles.input}>
							<Controller
								control={control}
								name="nome"
								render={({ field: { onChange, value, onBlur } }) => (
									<Input
										autoCapitalize="words"
										error={!!errors.nome}
										inputMode="text"
										onBlur={onBlur}
										onChangeText={onChange}
										placeholder="Nome"
										placeholderTextColor={colors.gray300}
										value={value}
									/>
								)}
								rules={{
									required: true,
								}}
							/>
							{errors.nome && (
								<Text style={inputErrorStyle}>{errors.nome.message}</Text>
							)}
						</View>

						{/* Input Email */}
						<View style={styles.input}>
							<Controller
								control={control}
								name="email"
								render={({ field: { onChange, value, onBlur } }) => (
									<Input
										error={!!errors.email}
										inputMode="email"
										onBlur={onBlur}
										onChangeText={onChange}
										placeholder="Email"
										placeholderTextColor={colors.gray300}
										value={value}
									/>
								)}
								rules={{
									required: true,
								}}
							/>
							{errors.email && (
								<Text style={inputErrorStyle}>{errors.email.message}</Text>
							)}
						</View>

						{/* Input Telefone */}
						<View style={styles.input}>
							<Controller
								control={control}
								name="telefone"
								render={({ field: { onChange, value, onBlur } }) => (
									<Input
										error={!!errors.telefone}
										// keyboardType="email-address"
										inputMode="tel"
										onBlur={onBlur}
										onChangeText={onChange}
										placeholder="Telefone"
										placeholderTextColor={colors.gray300}
										value={value ? String(value) : ""}
									/>
								)}
								rules={{
									required: false,
								}}
							/>
							{errors.telefone && (
								<Text style={inputErrorStyle}>{errors.telefone.message}</Text>
							)}
						</View>

						{/* Input Endereço */}
						<View style={styles.input}>
							<Controller
								control={control}
								name="endereco"
								render={({ field: { onChange, value, onBlur } }) => (
									<Input
										error={!!errors.endereco}
										// keyboardType="email-address"
										inputMode="text"
										onBlur={onBlur}
										onChangeText={onChange}
										placeholder="Endereço"
										placeholderTextColor={colors.gray300}
										value={value ? String(value) : ""}
									/>
								)}
								rules={{
									required: false,
								}}
							/>
							{errors.endereco && (
								<Text style={inputErrorStyle}>{errors.endereco.message}</Text>
							)}
						</View>
					</View>

					<View style={styles.submitButtons}>
						<MyButton primary>
							<Text style={[typography.bodyLgBold, { color: colors.white }]}>
								Salvar e sair
							</Text>
						</MyButton>

						<MyButton secundary>
							<Text style={[typography.bodyLgBold, { color: colors.green500 }]}>
								Salvar e cadastrar fazenda
							</Text>
						</MyButton>
					</View>
				</View>
			</SafeAreaView>
		</ProtectedRoute>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 80,
		paddingHorizontal: 16,
		paddingVertical: 20,
	},
	form: {
		width: "100%",
		flex: 1,
		alignItems: "center",
		gap: 64,
	},
	inputs: {
		width: "100%",
		gap: 16,
	},
	input: {
		gap: 4,
	},
	inputError: {
		color: colors.red400,
		fontWeight: 700,
	},
	submitButtons: {
		width: "100%",
		gap: 16,
	},
})

const inputErrorStyle = [typography.bodyMd, styles.inputError]
