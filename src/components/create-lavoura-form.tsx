import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Text, type TextInput, View } from "react-native"
import z from "zod"
import { useCreateLavoura } from "@/http/use-create-lavoura"
import { colors } from "@/themes/colors"
import { globalStyles } from "@/themes/global-styles"
import { typography } from "@/themes/typography"
import { MyButton } from "./button"
import { Input } from "./input"
import { RadioInputBoolean } from "./radio-inputs/radio-input-boolean"
import { RadioInputText } from "./radio-inputs/radio-input-text"

const createLavouraSchema = z.object({
	nome: z.string().min(1, "O nome é obrigatório"),
	tamanho: z.string().optional(), // Mudando para number | undefined para corresponder à API
	tipo_solo: z.string().optional(),
	tipo_formato: z.string().min(1, "O formato é obrigatório"),
	tem_irrigacao: z.boolean(),
})

type CreateLavouraFormData = z.infer<typeof createLavouraSchema>

type CreateLavouraFormProps = {
	sede_id: number
}

export function CreateLavouraForm({ sede_id }: CreateLavouraFormProps) {
	const [temIrrigacaoInputValue, setTemIrrigacaoInputValue] = useState(true)
	const [formatoInputValue, setFormatoInputValue] = useState("")

	const inputErrorStyle = [typography.bodyMd, globalStyles.inputError]

	const nomeRef = useRef<TextInput>(null)
	const tamanhoRef = useRef<TextInput>(null)
	const tipoSoloRef = useRef<TextInput>(null)
	const formatoRef = useRef<TextInput>(null)

	const { mutateAsync: createLavoura } = useCreateLavoura()

	const {
		control,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<CreateLavouraFormData>({
		resolver: zodResolver(createLavouraSchema),
		defaultValues: {
			nome: "",
			tamanho: undefined,
			tipo_solo: "",
			tipo_formato: "",
			tem_irrigacao: true,
		},
	})

	setValue("tipo_formato", formatoInputValue)
	setValue("tem_irrigacao", temIrrigacaoInputValue)

	async function handleCreateLavoura({
		nome,
		tamanho,
		tipo_solo,
		tipo_formato,
		tem_irrigacao,
	}: CreateLavouraFormData) {
		await createLavoura({
			nome,
			tamanho,
			tipo_solo,
			tipo_formato,
			tem_irrigacao,
			sede_id,
		})

		reset()
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
								onChangeText={(text) => {
									const formatedText = text.replace(",", ".")

									onChange(formatedText)
								}}
								onSubmitEditing={() => tipoSoloRef.current?.focus()}
								placeholder="Tamanho/ha (opcional)"
								placeholderTextColor={colors.gray300}
								ref={tamanhoRef}
								returnKeyType="next"
								value={value !== undefined ? String(value) : ""}
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

					{/* Input Formato */}
					<View style={{ gap: 8 }}>
						<Text style={[typography.bodyLg, { color: colors.gray500 }]}>
							Formato:
						</Text>
						<RadioInputText
							checkedValue={formatoInputValue}
							onChange={setFormatoInputValue}
							options={[
								{ label: "Retangular", value: "retangular" },
								{ label: "Circular", value: "circular" },
							]}
						/>
					</View>

					{/* Input Irrigação */}
					<View style={{ gap: 8 }}>
						<Text>Tipo irrigação:</Text>
						<RadioInputBoolean
							checkedValue={temIrrigacaoInputValue}
							onChange={setTemIrrigacaoInputValue}
							options={[
								{ label: "Irrigação", value: true },
								{ label: "Cerqueiro", value: false },
							]}
						/>
					</View>
				</View>
			</View>

			<View style={globalStyles.submitButtons}>
				<MyButton onPress={handleSubmit(handleCreateLavoura)} primary>
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
