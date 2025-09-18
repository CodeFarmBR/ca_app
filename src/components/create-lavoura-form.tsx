import { zodResolver } from "@hookform/resolvers/zod"
import { useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { Text, type TextInput, View } from "react-native"
import z from "zod"
import { useCreateLavoura } from "@/http/use-create-lavoura"
import { colors } from "@/themes/colors"
import { globalStyles } from "@/themes/global-styles"
import { typography } from "@/themes/typography"
import { MyButton } from "./button"
import { Input } from "./input"

const createLavouraSchema = z.object({
	nome: z.string().min(1, "O nome é obrigatório"),
	tamanho: z.number().optional(),
	tipo_solo: z.string().optional(),
	formato: z.string().min(1, "O formato é obrigatório"),
	tem_irrigacao: z.boolean(),
})

type CreateLavouraFormData = z.infer<typeof createLavouraSchema>

type CreateLavouraFormProps = {
	sede_id: number
}

export function CreateLavouraForm({ sede_id }: CreateLavouraFormProps) {
	const inputErrorStyle = [typography.bodyMd, globalStyles.inputError]
	const nomeRef = useRef<TextInput>(null)
	const tamanhoRef = useRef<TextInput>(null)
	const tipoSoloRef = useRef<TextInput>(null)
	const formatoRef = useRef<TextInput>(null)
	const temIrrigacao = useRef<TextInput>(null)

	const { mutateAsync: createLavoura } = useCreateLavoura()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateLavouraFormData>({
		resolver: zodResolver(createLavouraSchema),
		defaultValues: {
			nome: "",
			tamanho: 0,
			tipo_solo: "",
			formato: "",
			tem_irrigacao: false,
		},
	})

	async function handleCreateLavoura({
		nome,
		tamanho,
		tipo_solo,
		formato,
		tem_irrigacao,
	}: CreateLavouraFormData) {
		await createLavoura({
			nome,
			tamanho,
			tipo_solo,
			formato,
			tem_irrigacao,
			sede_id,
		})
	}

	return (
		<View style={globalStyles.form}>
			<View style={globalStyles.inputsContainer}>
				<View style={globalStyles.input}>
					{/* Input Nome */}
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
								onSubmitEditing={() => tamanhoRef.current?.focus()}
								placeholder="Nome"
								placeholderTextColor={colors.gray300}
								ref={nomeRef}
								returnKeyType="next"
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

					{/* Input Tamanho */}
					<Controller
						control={control}
						name="tamanho"
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								error={!!errors.tamanho}
								inputMode="decimal"
								onBlur={onBlur}
								onChangeText={onChange}
								onSubmitEditing={() => tipoSoloRef.current?.focus()}
								placeholder="Tamanho/ha (opcional)"
								placeholderTextColor={colors.gray300}
								ref={tamanhoRef}
								returnKeyType="next"
								value={value ? String(value) : ""}
							/>
						)}
					/>
					{errors.tamanho && (
						<Text style={inputErrorStyle}>{errors.tamanho.message}</Text>
					)}

					{/* Input Tipo Solo */}
					<Controller
						control={control}
						name="tipo_solo"
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								error={!!errors.tipo_solo}
								inputMode="text"
								onBlur={onBlur}
								onChangeText={onChange}
								onSubmitEditing={() => formatoRef.current?.focus()}
								placeholder="Tipo Solo (opcional)"
								placeholderTextColor={colors.gray300}
								ref={tipoSoloRef}
								returnKeyType="next"
								value={value}
							/>
						)}
					/>
					{errors.tipo_solo && (
						<Text style={inputErrorStyle}>{errors.tipo_solo.message}</Text>
					)}

					{/* Input Tipo Formato */}
					<Controller
						control={control}
						name="formato"
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								error={!!errors.formato}
								inputMode="text"
								onBlur={onBlur}
								onChangeText={onChange}
								onSubmitEditing={() => formatoRef.current?.focus()}
								placeholder="Formato (opcional)"
								placeholderTextColor={colors.gray300}
								ref={formatoRef}
								returnKeyType="next"
								value={value}
							/>
						)}
					/>
					{errors.formato && (
						<Text style={inputErrorStyle}>{errors.formato.message}</Text>
					)}
				</View>
			</View>

			<View style={globalStyles.submitButtons}>
				<MyButton primary>
					<Text style={[typography.bodyLgBold, { color: colors.white }]}>
						Salvar
					</Text>
				</MyButton>

				{/* <MyButton secundary> @todo
							<Text style={[typography.bodyLgBold, { color: colors.green500 }]}>
								Salvar e cadastrar sede
							</Text>
						</MyButton> */}
			</View>
		</View>
	)
}
