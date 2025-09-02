import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Text, View } from "react-native"
import z from "zod"
import { MyButton } from "@/components/button"
import { Input } from "@/components/input"
import { useCreateFazenda } from "@/http/use-create-fazenda"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

const createFazendaSchema = z.object({
	nome: z
		.string()
		.min(3, "O nome é obrigatório e deve conter 3 ou mais caracteres"),
	localizacao: z
		.string()
		.min(3, "A localização é obrigatória  e deve conter 3 ou mais caracteres"),
	latitude: z.number().min(-90).max(90),
	longitude: z.number().min(-180).max(180),
	tamanho: z.number().optional(),
	clima_regiao: z.string().optional(),
	cliente_id: z.string().optional(),
})

type CreateFazendaFormData = z.infer<typeof createFazendaSchema>

type CreateFazendaFormProps = {
	clienteId?: string
}

export function CreateFazendaForm({ clienteId }: CreateFazendaFormProps) {
	const inputErrorStyle = [typography.bodyMd, styles.inputError]

	const { mutateAsync: createFazenda } = useCreateFazenda()

	const {
		control,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateFazendaFormData>({
		resolver: zodResolver(createFazendaSchema),
		defaultValues: {
			nome: "",
			localizacao: "",
			tamanho: 0,
			clima_regiao: "",
		},
	})

	setValue("latitude", 1)
	setValue("longitude", 1)
	// Set the cliente_id if it's provided
	if (clienteId) {
		setValue("cliente_id", clienteId)
	}

	async function handleCreateFazenda({
		nome,
		localizacao,
		latitude,
		longitude,
		tamanho,
		clima_regiao,
		cliente_id,
	}: CreateFazendaFormData) {
		await createFazenda({
			nome,
			localizacao,
			latitude,
			longitude,
			tamanho,
			clima_regiao,
			cliente_id,
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

				{/* Input Localização */}
				<View style={styles.input}>
					<Controller
						control={control}
						name="localizacao"
						render={({ field: { onChange, value, onBlur } }) => (
							<Input
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

				{/* Input Tamanho */}
				<View style={styles.input}>
					<Controller
						control={control}
						name="tamanho"
						render={({ field: { onChange, value, onBlur } }) => (
							<Input
								error={!!errors.tamanho}
								inputMode="decimal"
								onBlur={onBlur}
								onChangeText={(text) => {
									// Aceita ponto ou vírgula como separador decimal
									const normalized = text.replace(",", ".")
									onChange(text === "" ? undefined : Number(normalized))
								}}
								placeholder="Tamanho em hectares (opcional)"
								placeholderTextColor={colors.gray300}
								value={value ? String(value) : ""}
							/>
						)}
					/>
					{errors.tamanho && (
						<Text style={inputErrorStyle}>{errors.tamanho?.message}</Text>
					)}
				</View>

				{/* Input Clima Região */}
				<View style={styles.input}>
					<Controller
						control={control}
						name="clima_regiao"
						render={({ field: { onChange, value, onBlur } }) => (
							<Input
								error={!!errors.clima_regiao}
								inputMode="text"
								onBlur={onBlur}
								onChangeText={onChange}
								placeholder="Clima da região (opcional)"
								placeholderTextColor={colors.gray300}
								value={value}
							/>
						)}
					/>
					{errors.clima_regiao && (
						<Text style={inputErrorStyle}>{errors.clima_regiao.message}</Text>
					)}
				</View>
			</View>

			<View style={styles.submitButtons}>
				<MyButton onPress={handleSubmit(handleCreateFazenda)} primary>
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
