import { Stack } from "expo-router";

export default function AuthLayout() {
	return (
		// Este Stack só controla as telas dentro do grupo (auth)
		<Stack>
			<Stack.Screen
				name="login" // Corresponde ao arquivo login.tsx
				options={{
					headerShown: false, // Exemplo: não mostrar o cabeçalho na tela de login
				}}
			/>
			{/* Se você tivesse uma tela de cadastro (app/(auth)/register.tsx),
        você a declararia aqui também.
        <Stack.Screen 
          name="register" 
          options={{ 
            title: 'Crie sua Conta', 
            headerBackTitle: 'Voltar' 
          }} 
        />
      */}
		</Stack>
	);
}
