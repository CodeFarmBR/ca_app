import { TouchableOpacity, type TouchableOpacityProps } from "react-native"

import { Styles } from "./styles"

type MyButtonProps = TouchableOpacityProps & {
	primary?: boolean
	secundary?: boolean
	disabled?: boolean
}

export function MyButton({
	primary,
	secundary,
	disabled,
	...rest
}: MyButtonProps) {
	const BtnStyle = [
		Styles.base,
		primary && Styles.primary,
		secundary && Styles.secundary,
		disabled && Styles.disabled,
	]

	return <TouchableOpacity {...rest} style={BtnStyle} />
}
