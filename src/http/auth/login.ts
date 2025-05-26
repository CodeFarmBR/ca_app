interface loginRequest {
	email: string;
	senha: string;
}

export interface TokenResponse {
	access_token: string;
	refresh_token: string;
}

const apiURL = process.env.EXPO_PUBLIC_API_URL;

export async function login({
	email,
	senha,
}: loginRequest): Promise<TokenResponse> {
	const response = await fetch(`${apiURL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			senha,
		}),
	});

	if (response.status === 401) {
		throw new Error("Senha incorreta");
	}

	if (response.status === 404) {
		throw new Error("Usuário não encontrado");
	}

	if (!response.ok) {
		const errorText = await response.json(); // ou response.json(), se o erro vier como JSON
		throw new Error(`Erro ${response.status}: ${errorText}`);
	}

	const tokensResponse = await response.json();
	return tokensResponse;
}
