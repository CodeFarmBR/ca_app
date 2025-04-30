import {
	TouchableOpacity,
	type TouchableOpacityProps,
	Text,
} from "react-native";

import { styles } from "./styles";

type MyButtonProps = TouchableOpacityProps & {
	title: string;
};

export function MyButton({ title, ...rest }: MyButtonProps) {
	return (
		<TouchableOpacity style={styles.button} {...rest}>
			<Text style={styles.title}>{title}</Text>
		</TouchableOpacity>
	);
}
