import { Eye, EyeOff } from "lucide-react-native"
import { useState } from "react"
import { Pressable, TextInput, type TextInputProps, View } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

type Props = TextInputProps & {
	secure?: boolean
	error?: boolean
}

export function Input({
	secure = false,
	error = false,
	value = "",
	...rest
}: Props) {
	const [isFocused, setIsFocused] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const isEmpty = String(value).trim().length === 0

	const containerStyle = [
		styles.container,
		isEmpty && error && styles.emptyError,
		isEmpty && !error && isFocused && styles.emptyActive,
		isEmpty && !error && !isFocused && styles.emptyDefault,
		!isEmpty && error && styles.filledError,
		!(isEmpty || error) && isFocused && styles.filledActive,
		!(isEmpty || error || isFocused) && styles.filledDefault,
	]

	return (
		<View style={containerStyle}>
			<TextInput
				onEndEditing={() => setIsFocused(false)}
				onFocus={() => setIsFocused(true)}
				secureTextEntry={secure && !showPassword}
				style={[styles.input, typography.bodyLg]}
				value={value}
				{...rest}
			/>

			{secure && (
				<Pressable onPress={() => setShowPassword((prev) => !prev)}>
					{showPassword ? (
						<EyeOff color={colors.gray300} strokeWidth={1} />
					) : (
						<Eye color={colors.gray300} strokeWidth={1} />
					)}
				</Pressable>
			)}
		</View>
	)
}
