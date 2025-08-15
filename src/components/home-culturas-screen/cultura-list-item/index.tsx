import { Link } from "expo-router"
import { Ellipsis } from "lucide-react-native"
import { Pressable, Text, View } from "react-native"
import { colors } from "@/themes/colors"
import { typography } from "@/themes/typography"
import { styles } from "./styles"

export type CulturaItemProps = {
    cultura_id: string
    nome: string
    variedade: string
}

export function CulturaListItem({ cultura_id, nome, variedade }: CulturaItemProps) {
    return (
        <Link asChild href={{ pathname: "/cultura/[id]", params: { id: cultura_id } }}>
            <Pressable>
                <View style={styles.container}>
                    <View>
                        <Text style={[typography.bodyLg, { color: colors.gray900 }]}>
                            {nome}
                        </Text>
                        <Text style={[typography.bodyMd, { color: colors.gray500 }]}>
                            {variedade}
                        </Text>
                    </View>
                    <Ellipsis />
                </View>
            </Pressable>
        </Link>
    )
}