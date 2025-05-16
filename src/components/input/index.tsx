import { TextInput, type TextInputProps } from "react-native";

import { styles } from "./styles";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";

export function Input({ ...rest }: TextInputProps) {
	return <TextInput style={[typography.bodyMd, { color: colors.gray900 }, styles.input]} {...rest} />;
}
