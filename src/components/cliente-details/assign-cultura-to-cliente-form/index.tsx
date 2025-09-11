import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, CirclePlus } from "lucide-react-native"
import { Controller, useForm } from "react-hook-form"
import { Pressable, Text, TextInput, View } from "react-native"
import z from "zod"
import { useAssignCulturaToCliente } from "@/http/use-assign-cultura-to-cliente"
import { colors } from "@/themes/colors"
import { globalStyles } from "@/themes/global-styles"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

// Regex para validar o formato DD/MM/AAAA
const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/

// Função para verificar se o ano é pelo menos o atual
const isYearAtLeastCurrent = (dateString: string): boolean => {
	const parts = dateString.split("/")
	if (parts.length !== 3) {
		return true // Se não for uma data completa, deixa passar (outros validadores pegam)
	}

	const year = Number(parts[2])
	const currentYear = new Date().getFullYear()
	return year >= currentYear
}

const assignCulturaToClienteSchema = z.object({
	data_inicio: z
		.string()
		.min(1, "Data de início obrigatória")
		.max(10, "Formato inválido")
		.regex(datePattern, "Use o formato DD/MM/AAAA")
		.refine(isYearAtLeastCurrent, {
			message: `O ano deve ser pelo menos ${new Date().getFullYear()}`,
		}),
	data_fim: z
		.string()
		.min(1, "Data de fim obrigatória")
		.max(10, "Formato inválido")
		.regex(datePattern, "Use o formato DD/MM/AAAA")
		.refine(isYearAtLeastCurrent, {
			message: `O ano deve ser pelo menos ${new Date().getFullYear()}`,
		}),
})

type AssignCulturaToClienteFormData = z.infer<
	typeof assignCulturaToClienteSchema
>

type FormProps = {
	cliente_id: string
	cultura_id: number
}

export function AssignCulturaToClienteForm({
	cliente_id,
	cultura_id,
}: FormProps) {
	const inputErrorStyle = [typography.bodyMd, globalStyles.inputError]

	const { mutateAsync: assignCultura } = useAssignCulturaToCliente()

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<AssignCulturaToClienteFormData>({
		resolver: zodResolver(assignCulturaToClienteSchema),
		defaultValues: {
			data_inicio: "",
			data_fim: "",
		},
	})

	// Função para converter data de DD/MM/AAAA para YYYY-MM-DD
	function formatDateForAPI(dateString: string): string {
		// Divide a data em dia, mês e ano
		const [day, month, year] = dateString.split("/")
		// Retorna no formato YYYY-MM-DD
		return `${year}-${month}-${day}`
	}

	// Validar o dia (não maior que 31)
	function validateDay(day: string): string {
		if (!day) {
			return day
		}

		const numDay = Number(day)
		if (numDay > 31) {
			return "31"
		}

		if (numDay === 0 && day.length >= 2) {
			return "01"
		}

		return day
	}

	// Validar o mês (não maior que 12)
	function validateMonth(month: string): string {
		if (!month) {
			return month
		}

		const numMonth = Number(month)
		if (numMonth > 12) {
			return "12"
		}

		if (numMonth === 0 && month.length >= 2) {
			return "01"
		}

		return month
	}

	// Validar o ano (não alteramos mais automaticamente)
	function validateYear(year: string): string {
		// Apenas retorna o valor sem modificar
		return year
	}

	// Função para adicionar barras automaticamente
	function addSlashes(text: string): string {
		if (text.length === 2 && !text.includes("/")) {
			return `${text}/`
		}

		if (text.length === 5 && text.indexOf("/", 3) === -1) {
			return `${text}/`
		}

		return text
	}

	// Função para validar e formatar texto de data com regras de negócio
	function validateAndFormatDate(text: string, previousValue: string): string {
		const isDeleting = text.length < previousValue.length
		let formatted = text.replace(/[^\d/]/g, "")

		// Se estiver apagando, retorna sem formatações adicionais
		if (isDeleting) {
			return formatted
		}

		// Validações de dias, meses e anos
		const parts = formatted.split("/")

		// Validação para o dia, mês e ano
		if (parts[0]) {
			parts[0] = validateDay(parts[0])
		}

		if (parts[1]) {
			parts[1] = validateMonth(parts[1])
		}

		if (parts[2]) {
			parts[2] = validateYear(parts[2])
		}

		formatted = parts.join("/")

		// Adiciona / automaticamente
		formatted = addSlashes(formatted)

		return formatted
	}

	async function handleAssignCultura({
		data_inicio,
		data_fim,
	}: AssignCulturaToClienteFormData) {
		await assignCultura({
			cliente_id,
			data_inicio: formatDateForAPI(data_inicio),
			data_fim: formatDateForAPI(data_fim),
			cultura_id,
		})
	}

	return (
		<View style={styles.formContainer}>
			<View style={styles.datePickersContainer}>
				<View style={styles.datePickerField}>
					<Text style={typography.bodySm}>Data início:</Text>
					<View style={styles.datePickerInput}>
						<CalendarIcon color={colors.gray500} size={24} strokeWidth={1} />
						<Controller
							control={control}
							name="data_inicio"
							render={({ field: { onChange, value, onBlur } }) => (
								<TextInput
									inputMode="numeric"
									maxLength={10}
									onBlur={onBlur}
									onChangeText={(text) => {
										const formatted = validateAndFormatDate(text, value)
										onChange(formatted)
									}}
									placeholder="DD/MM/AAAA"
									style={{ flex: 1 }}
									value={value}
								/>
							)}
							rules={{
								required: true,
							}}
						/>
					</View>
					{errors.data_inicio && (
						<Text style={inputErrorStyle}>{errors.data_inicio.message}</Text>
					)}
				</View>

				<View style={styles.datePickerField}>
					<Text style={typography.bodySm}>Data fim:</Text>
					<View style={styles.datePickerInput}>
						<CalendarIcon color={colors.gray500} size={24} strokeWidth={1} />
						<Controller
							control={control}
							name="data_fim"
							render={({ field: { onChange, value, onBlur } }) => (
								<TextInput
									inputMode="numeric"
									maxLength={10}
									onBlur={onBlur}
									onChangeText={(text) => {
										const formatted = validateAndFormatDate(text, value)
										onChange(formatted)
									}}
									placeholder="DD/MM/AAAA"
									style={{ flex: 1 }}
									value={value}
								/>
							)}
							rules={{
								required: true,
							}}
						/>
					</View>
					{errors.data_fim && (
						<Text style={inputErrorStyle}>{errors.data_fim.message}</Text>
					)}
				</View>
			</View>

			<Pressable onPress={handleSubmit(handleAssignCultura)}>
				<CirclePlus color={colors.green500} size={32} strokeWidth={1} />
			</Pressable>
		</View>
	)
}
