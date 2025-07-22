import { ActivityIndicator } from "react-native";

// Este componente será renderizado por uma fração de segundo (ou nem isso)
// antes que o _layout.tsx decida para onde te redirecionar.
// Ele serve apenas para evitar o erro de "rota não encontrada".
export default function Index() {
	// Você pode retornar uma View vazia ou um indicador de carregamento
	// para cobrir o brevíssimo momento da transição.
	return <ActivityIndicator size="large" style={{ flex: 1 }} />;
}
