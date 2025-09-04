import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Text, View } from "react-native"
import z from "zod"
import { useCreateCultura } from "@/http/use-create-cultura"
import { colors } from "@/themes/colors"
import { globalStyles } from "@/themes/global-styles"
import { typography } from "@/themes/typography"
import { MyButton } from "./button"
import { Input } from "./input"

const createCulturaSchema = z.object({
	nome: z.string().min(1, "O nome é obrigatório"),
	variedade: z.string().min(1, "A variedade é obrigatória"),
	ano_safra: z.string().min(1, "O campo é obrigatório"),
})

type CreateCulturaFormData = z.infer<typeof createCulturaSchema>

export function CreateCulturaForm() {
	const inputErrorStyle = [typography.bodyMd, globalStyles.inputError]

	const { mutateAsync: createCultura } = useCreateCultura()

	const getCurrentSafraYear = () => {
		const currentYear = new Date().getFullYear()
		const currentYearShort = currentYear.toString().slice(-2)
		const nextYearShort = (currentYear + 1).toString().slice(-2)
		return `${currentYearShort}/${nextYearShort}`
	}

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateCulturaFormData>({
		resolver: zodResolver(createCulturaSchema),
		defaultValues: {
			nome: "",
			variedade: "",
			ano_safra: getCurrentSafraYear(),
		},
	})

	async function handleCreateCultura({
		nome,
		variedade,
		ano_safra,
	}: CreateCulturaFormData) {
		await createCultura({
			nome,
			variedade,
			ano_safra,
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

				{/* Input Variedade */}
				<View style={globalStyles.input}>
					<Controller
						control={control}
						name="variedade"
						render={({ field: { onChange, value, onBlur } }) => (
							<Input
								autoCapitalize="words"
								error={!!errors.variedade}
								inputMode="text"
								onBlur={onBlur}
								onChangeText={onChange}
								placeholder="Variedade"
								placeholderTextColor={colors.gray300}
								value={value}
							/>
						)}
						rules={{
							required: true,
						}}
					/>
					{errors.variedade && (
						<Text style={inputErrorStyle}>{errors.variedade.message}</Text>
					)}
				</View>

				{/* Input Ano Safra */}
				<View style={globalStyles.input}>
					<Controller
						control={control}
						name="ano_safra"
						render={({ field: { onChange, value, onBlur } }) => (
							<Input
								autoCapitalize="words"
								error={!!errors.ano_safra}
								inputMode="text"
								onBlur={onBlur}
								onChangeText={onChange}
								placeholder="Ano Safra"
								placeholderTextColor={colors.gray300}
								value={value}
							/>
						)}
						rules={{
							required: true,
						}}
					/>
					{errors.ano_safra && (
						<Text style={inputErrorStyle}>{errors.ano_safra.message}</Text>
					)}
				</View>
			</View>

			<View style={globalStyles.submitButtons}>
				<MyButton onPress={handleSubmit(handleCreateCultura)} primary>
					<Text style={[typography.bodyLgBold, { color: colors.white }]}>
						Salvar
					</Text>
				</MyButton>
			</View>
		</View>
	)
}
