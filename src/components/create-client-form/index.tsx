import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Text, View } from "react-native"
import z from "zod"
import { MyButton } from "@/components/button"
import { Input } from "@/components/input"
import { useAuth } from "@/context/auth-context"
import { useCreateClient } from "@/http/use-create-clients"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

const createClienteSchema = z.object({
	nome: z
		.string()
		.min(3, "O nome é obrigatório e deve conter 3 ou mais caracteres"),
	email: z.string().min(1, "O e-mail é obrigatório").email("E-mail inválido"),
	telefone: z.string(),
	endereco: z.string(),
	consultor_cadastrou_id: z.string(),
	consultoria_id: z.number(),
})

type CreateClienteFormData = z.infer<typeof createClienteSchema>

export default function CreateClientForm() {
	const inputErrorStyle = [typography.bodyMd, styles.inputError]

	const { profile } = useAuth()

	const { mutateAsync: createClient } = useCreateClient()

	const {
		control,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateClienteFormData>({
		resolver: zodResolver(createClienteSchema),
		defaultValues: {
			nome: "",
			email: "",
		},
	})

	setValue("consultor_cadastrou_id", "")
	setValue("consultoria_id", 0)

	async function handleCreateClient({
		nome,
		email,
		telefone,
		endereco,
		consultor_cadastrou_id,
		consultoria_id,
	}: CreateClienteFormData) {
		await createClient({
			nome,
			email,
			telefone,
			endereco,
			consultor_cadastrou_id,
			consultoria_id,
		})
	}

	return (
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
								placeholder="Telefone (opcional)"
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
								placeholder="Endereço (opcional)"
								placeholderTextColor={colors.gray300}
								value={value ? String(value) : ""}
							/>
						)}
					/>
					{errors.endereco && (
						<Text style={inputErrorStyle}>{errors.endereco.message}</Text>
					)}
				</View>
			</View>

			<View style={styles.submitButtons}>
				<MyButton onPress={handleSubmit(handleCreateClient)} primary>
					<Text style={[typography.bodyLgBold, { color: colors.white }]}>
						Salvar
					</Text>
				</MyButton>

				{/* <MyButton secundary> @todo
							<Text style={[typography.bodyLgBold, { color: colors.green500 }]}>
								Salvar e cadastrar fazenda
							</Text>
						</MyButton> */}
			</View>
		</View>
	)
}
