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

const assignCulturaToClienteSchema = z.object({
	data_inicio: z.string().min(1, "Ambas as datas são obrigatórias").max(10),
	data_fim: z.string().min(1, "Ambas as datas são obrigatórias").max(10),
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
	})

	async function handleAssignCultura({
		data_inicio,
		data_fim,
	}: AssignCulturaToClienteFormData) {
		await assignCultura({
			data_inicio,
			data_fim,
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
									error={!!errors.data_inicio}
									inputMode="text"
									onBlur={onBlur}
									onChangeText={onChange}
									placeholder="DD/MM/AAAA"
									value={value}
								/>
							)}
							rules={{
								required: true,
							}}
						/>
						{errors.data_inicio && (
							<Text style={inputErrorStyle}>{errors.data_inicio.message}</Text>
						)}
					</View>
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
									error={!!errors.data_fim}
									inputMode="text"
									onBlur={onBlur}
									onChangeText={onChange}
									placeholder="DD/MM/AAAA"
									value={value}
								/>
							)}
							rules={{
								required: true,
							}}
						/>
						{errors.data_fim && (
							<Text style={inputErrorStyle}>{errors.data_fim.message}</Text>
						)}
					</View>
				</View>
			</View>

			<Pressable>
				<CirclePlus color={colors.green500} size={32} strokeWidth={1} />
			</Pressable>
		</View>
	)
}
