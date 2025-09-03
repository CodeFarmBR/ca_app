import { Redirect } from "expo-router"

export default function Index() {
	// Se o usuário não está logado, redirecione para a tela de login.
	return <Redirect href="/login" />
}
