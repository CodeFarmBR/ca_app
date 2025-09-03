import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

export default function CulturaDetalhesScreen() {
    const { id } = useLocalSearchParams<{ id: string }>()

    return (
        <View>
            <Text>Cultura com o id: {id}</Text>
        </View>
    )
}
