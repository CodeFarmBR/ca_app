import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Text, View } from "react-native"
import z from "zod"
import { useCreateSede } from "@/http/use-create-sede"
import { colors } from "@/themes/colors"
import { globalStyles } from "@/themes/global-styles"
import { typography } from "@/themes/typography"
import { MyButton } from "./button"
import { Input } from "./input"

const createSedeSchema = z.object({
	nome: z.string().min(1, "O nome é obrigatório"),
	localizacao: z
		.string()
		.min(1, "A localização é obrigatória e deve conter 3 ou mais caracteres"),
	latitude: z.number().min(-90).max(90),
	longitude: z.number().min(-180).max(180),
	descricao: z.string().optional(),
})

type CreateSedeFormData = z.infer<typeof createSedeSchema>

type CreateSedeFormProps = {
	fazenda_id: number
}

export function CreateSedeForm({ fazenda_id }: CreateSedeFormProps) {
	const inputErrorStyle = [typography.bodyMd, globalStyles.inputError]

	const { mutateAsync: createSede } = useCreateSede()

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<CreateSedeFormData>({
		resolver: zodResolver(createSedeSchema),
		defaultValues: {
			nome: "",
			localizacao: "",
			latitude: 1,
			longitude: 1,
			descricao: "",
		},
	})

	async function handleCreateSede({
		nome,
		localizacao,
		latitude,
		longitude,
		descricao,
	}: CreateSedeFormData) {
		await createSede({
			nome,
			localizacao,
			latitude,
			longitude,
			descricao,
			fazenda_id,
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
						render={({ field: { onChange, onBlur, value } }) => (
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

				{/* Input Localização */}
				<View style={globalStyles.input}>
					<Controller
						control={control}
						name="localizacao"
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								autoCapitalize="words"
								error={!!errors.localizacao}
								inputMode="text"
								onBlur={onBlur}
								onChangeText={onChange}
								placeholder="Localização"
								placeholderTextColor={colors.gray300}
								value={value}
							/>
						)}
						rules={{
							required: true,
						}}
					/>
					{errors.localizacao && (
						<Text style={inputErrorStyle}>{errors.localizacao.message}</Text>
					)}
				</View>

				{/* Input Descrição */}
				<View style={globalStyles.input}>
					<Controller
						control={control}
						name="descricao"
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								autoCapitalize="words"
								error={!!errors.descricao}
								inputMode="text"
								onBlur={onBlur}
								onChangeText={onChange}
								placeholder="Descrição (opcional)"
								placeholderTextColor={colors.gray300}
								value={value}
							/>
						)}
					/>
					{errors.descricao && (
						<Text style={inputErrorStyle}>{errors.descricao.message}</Text>
					)}
				</View>
			</View>

			<View style={globalStyles.submitButtons}>
				<MyButton onPress={handleSubmit(handleCreateSede)} primary>
					<Text style={[typography.bodyLgBold, { color: colors.white }]}>
						Salvar
					</Text>
				</MyButton>

				{/* <MyButton secundary> @todo
							<Text style={[typography.bodyLgBold, { color: colors.green500 }]}>
								Salvar e cadastrar lavoura
							</Text>
						</MyButton> */}
			</View>
		</View>
	)
}
