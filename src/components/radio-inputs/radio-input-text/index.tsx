import { Text, TouchableOpacity, View } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "../styles"

type RadioInputProps = {
	options: Array<{
		label: string
		value: string
	}>
	checkedValue: string
	onChange: React.Dispatch<React.SetStateAction<string>>
}

export function RadioInputText({
	options,
	checkedValue,
	onChange,
}: RadioInputProps) {
	return (
		<View style={styles.optionsContainer}>
			{options.map((option) => {
				const active = checkedValue === option.value

				return (
					<View key={option.label} style={{ flex: 1 }}>
						<TouchableOpacity
							onPress={() => {
								onChange(option.value)
							}}
							style={styles.radioInputContainer}
						>
							<View
								style={[
									styles.radioButton,
									active
										? { borderColor: colors.green500 }
										: { borderColor: colors.gray500 },
								]}
							>
								<View style={active ? [styles.radioButtonChecked] : null} />
							</View>
							<Text
								style={[
									typography.bodyLg,
									active
										? { color: colors.gray900 }
										: { color: colors.gray500 },
								]}
							>
								{option.label}
							</Text>
						</TouchableOpacity>
					</View>
				)
			})}
		</View>
	)
}
