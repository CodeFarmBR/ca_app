import { Text, TouchableOpacity, View } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "../styles"

type RadioInputProps = {
	options: Array<{
		label: string
		value: boolean
	}>
	checkedValue: boolean
	onChange: React.Dispatch<React.SetStateAction<boolean>>
}

export function RadioInputBoolean({
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
								<View style={active ? [styles.radioButtonChecked] : ""} />
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
