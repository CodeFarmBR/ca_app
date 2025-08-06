import { TouchableOpacity, type TouchableOpacityProps } from "react-native"

import { styles } from "./styles"

type ButtonProps = TouchableOpacityProps & {
	primary?: boolean
	secundary?: boolean
	disabled?: boolean
}

export function MyButton({
	primary,
	secundary,
	disabled,
	...rest
}: ButtonProps) {
	const BtnStyle = [
		styles.base,
		primary && styles.primary,
		secundary && styles.secundary,
		disabled && styles.disabled,
	]

	return <TouchableOpacity activeOpacity={0.8} {...rest} style={BtnStyle} />
}
