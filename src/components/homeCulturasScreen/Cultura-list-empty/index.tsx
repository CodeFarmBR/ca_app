import { WheatOff } from "lucide-react-native"
import { Text, View } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

export default function CulturasListEmpty() {
    return (
        <View style={styles.container}>
            <WheatOff color={colors.gray500} size={64} strokeWidth={1} />
            <Text
                style={[
                    typography.bodyLgBold,
                    { fontWeight: "700", color: colors.gray500 },
                ]}
            >
                Nenhuma cultura encontrada
            </Text>
            <Text
                style={[
                    typography.bodyLg,
                    { color: colors.gray500, textAlign: "center" },
                ]}
            >
                Adicione uma nova para começar
            </Text>
        </View>
    )
}