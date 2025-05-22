import { TextInput, type TextInputProps, View, Pressable } from "react-native";
import { useState } from "react";

import { styles } from "./styles";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";
import { Eye, EyeOff } from "lucide-react-native";

type Props = TextInputProps & {
	secure?: boolean;
	error?: boolean;
};

export function Input({
	secure = false,
	error = false,
	value = "",
	...rest
}: Props) {
	const [isFocused, setIsFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const isEmpty = String(value).trim().length === 0;

	const containerStyle = [
		styles.container,
		isEmpty && error && styles.emptyError,
		isEmpty && !error && isFocused && styles.emptyActive,
		isEmpty && !error && !isFocused && styles.emptyDefault,
		!isEmpty && error && styles.filledError,
		!isEmpty && !error && isFocused && styles.filledActive,
		!isEmpty && !error && !isFocused && styles.filledDefault,
	];

	return (
		<View style={containerStyle}>
			<TextInput
				style={[styles.input, typography.bodyLg]}
				value={value}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				secureTextEntry={secure && !showPassword}
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
	);
}
