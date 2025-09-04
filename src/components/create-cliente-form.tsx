import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Text, View } from "react-native"
import z from "zod"
import { MyButton } from "@/components/button"
import { Input } from "@/components/input"
import { useAuth } from "@/context/auth-context"
import { useCreateCliente } from "@/http/use-create-cliente"
import { colors } from "@/themes/colors"
import { globalStyles } from "@/themes/global-styles"
import { typography } from "@/themes/typography"

const createClienteSchema = z.object({
	nome: z
		.string()
		.min(3, "O nome é obrigatório e deve conter 3 ou mais caracteres"),
	email: z.string().min(1, "O e-mail é obrigatório").email("E-mail inválido"),
	nome_empresa: z.string().optional(),
	telefone: z.string().optional(),
	endereco: z.string().optional(),
	consultor_cadastrou_id: z.string().optional(),
	consultoria_id: z.number().optional(),
})

type CreateClienteFormData = z.infer<typeof createClienteSchema>

export function CreateClienteForm() {
	const inputErrorStyle = [typography.bodyMd, globalStyles.inputError]

	const { profile } = useAuth()

	const { mutateAsync: createCliente } = useCreateCliente()

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
			nome_empresa: "",
			endereco: "",
			telefone: "",
		},
	})

	setValue("consultor_cadastrou_id", profile?.id)
	setValue("consultoria_id", profile?.consultoria_id)

	async function handleCreateClient({
		nome,
		email,
		nome_empresa,
		telefone,
		endereco,
		consultor_cadastrou_id,
		consultoria_id,
	}: CreateClienteFormData) {
		await createCliente({
			nome,
			email,
			nome_empresa,
			telefone,
			endereco,
			consultor_cadastrou_id,
			consultoria_id,
		})
	}

	return (
		<View style={globalStyles.form}>
			<View style={globalStyles.inputsContainer}>
				{/* Input Nome */}
				<View style={globalStyles.input}>
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
				<View style={globalStyles.input}>
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

				{/* Input Nome Empresa */}
				<View style={globalStyles.input}>
					<Controller
						control={control}
						name="nome_empresa"
						render={({ field: { onChange, value, onBlur } }) => (
							<Input
								error={!!errors.nome_empresa}
								inputMode="text"
								onBlur={onBlur}
								onChangeText={onChange}
								placeholder="Nome da Empresa (opcional)"
								placeholderTextColor={colors.gray300}
								value={value}
							/>
						)}
					/>
					{errors.nome_empresa && (
						<Text style={inputErrorStyle}>{errors.nome_empresa?.message}</Text>
					)}
				</View>

				{/* Input Telefone */}
				<View style={globalStyles.input}>
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
								value={value ? String(value) : ""} // Para campos do tipo números que devem ser convertidos em string
							/>
						)}
					/>
					{errors.telefone && (
						<Text style={inputErrorStyle}>{errors.telefone.message}</Text>
					)}
				</View>

				{/* Input Endereço */}
				<View style={globalStyles.input}>
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
								value={value}
							/>
						)}
					/>
					{errors.endereco && (
						<Text style={inputErrorStyle}>{errors.endereco.message}</Text>
					)}
				</View>
			</View>

			<View style={globalStyles.submitButtons}>
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
