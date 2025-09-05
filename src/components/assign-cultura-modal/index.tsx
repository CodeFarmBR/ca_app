import { useLocalSearchParams, useRouter } from "expo-router"
import { CirclePlus, X } from "lucide-react-native"
import { useState } from "react"
import { FlatList, Modal, Pressable, Text, TextInput, View } from "react-native"
import Toast from "react-native-toast-message"
import { useAuth } from "@/context/auth-context"
import { useAssignCulturaToCliente } from "@/http/use-assign-cultura-to-cliente"
import { useCulturas } from "@/http/use-culturas"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

export function AssignCulturaModal() {
	const router = useRouter()
	const { cliente_id } = useLocalSearchParams<{ cliente_id: string }>()
	const { profile } = useAuth()

	// For tracking date inputs for each cultura
	const [dateInputs, setDateInputs] = useState<
		Record<string, { data_inicio: string; data_fim: string }>
	>({})

	// Fetch available cultures
	const { data: culturas, isLoading } = useCulturas(profile?.consultoria_id)

	// Set up assign mutation
	const { mutate: assignCultura, isPending } =
		useAssignCulturaToCliente(cliente_id)

	// Handle assigning a culture to client
	const handleAssignCultura = (cultura_id: string | number) => {
		if (!cliente_id) {
			Toast.show({
				type: "error",
				text1: "Erro",
				text2: "ID do cliente não encontrado",
			})
			return
		}

		const dates = dateInputs[cultura_id.toString()]

		if (!(dates?.data_inicio && dates.data_fim)) {
			Toast.show({
				type: "error",
				text1: "Erro",
				text2: "Selecione as datas de início e fim",
			})
			return
		}

		// Format dates to YYYY-MM-DD
		const formatDate = (dateString: string) => {
			const [day, month, year] = dateString.split("/")
			return `${year}-${month}-${day}`
		}

		assignCultura({
			cultura_id: Number(cultura_id),
			data_inicio: formatDate(dates.data_inicio),
			data_fim: formatDate(dates.data_fim),
		})
	}

	// Handle date input change
	const handleDateChange = (
		culturaId: string | number,
		field: "data_inicio" | "data_fim",
		value: string
	) => {
		// Simple date mask for DD/MM/YYYY
		if (value.length > 10) {
			return
		}

		// Only allow numbers and /
		const newValue = value.replace(/[^\d/]/g, "")

		// Auto-add / after DD and MM
		let formattedValue = newValue
		if (newValue.length === 2 && !newValue.includes("/")) {
			formattedValue = `${newValue}/`
		} else if (newValue.length === 5 && newValue.indexOf("/", 3) === -1) {
			formattedValue = `${newValue}/`
		}

		setDateInputs((prev) => ({
			...prev,
			[culturaId.toString()]: {
				...(prev[culturaId.toString()] || { data_inicio: "", data_fim: "" }),
				[field]: formattedValue,
			},
		}))
	}

	return (
		<Modal
			animationType="slide"
			onRequestClose={() => router.back()}
			transparent={true}
			visible={true}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<View style={styles.modalHeader}>
						<Text style={[typography.headingLg, styles.modalTitle]}>
							Atribuir Cultura
						</Text>
						<Pressable onPress={() => router.back()} style={styles.closeButton}>
							<X color={colors.green500} size={24} />
						</Pressable>
					</View>

					{isLoading ? (
						<Text style={styles.loadingText}>Carregando culturas...</Text>
					) : (
						<FlatList
							contentContainerStyle={styles.flatListContent}
							data={culturas}
							keyExtractor={(item) => item.cultura_id.toString()}
							renderItem={({ item }) => {
								const dates = dateInputs[item.cultura_id.toString()] || {
									data_inicio: "",
									data_fim: "",
								}

								return (
									<View style={styles.culturaItem}>
										<View style={styles.culturaInfo}>
											<Text style={[typography.headingMd, styles.culturaNome]}>
												{item.nome}
											</Text>
											<Text
												style={[typography.bodyMd, styles.culturaVariedade]}
											>
												{item.variedade} - {item.ano_safra}
											</Text>
										</View>

										<View style={styles.dateInputsContainer}>
											<View style={styles.dateInputWrapper}>
												<Text style={[typography.bodySm, styles.dateLabel]}>
													Data início:
												</Text>
												<TextInput
													keyboardType="numeric"
													onChangeText={(text) =>
														handleDateChange(
															item.cultura_id,
															"data_inicio",
															text
														)
													}
													placeholder="DD/MM/AAAA"
													style={styles.dateInput}
													value={dates.data_inicio}
												/>
											</View>

											<View style={styles.dateInputWrapper}>
												<Text style={[typography.bodySm, styles.dateLabel]}>
													Data fim:
												</Text>
												<TextInput
													keyboardType="numeric"
													onChangeText={(text) =>
														handleDateChange(item.cultura_id, "data_fim", text)
													}
													placeholder="DD/MM/AAAA"
													style={styles.dateInput}
													value={dates.data_fim}
												/>
											</View>
										</View>

										<Pressable
											disabled={isPending}
											onPress={() => handleAssignCultura(item.cultura_id)}
											style={[
												styles.addButton,
												isPending && styles.disabledButton,
											]}
										>
											<CirclePlus color={colors.white} size={24} />
										</Pressable>
									</View>
								)
							}}
						/>
					)}
				</View>
			</View>
		</Modal>
	)
}
