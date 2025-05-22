interface loginRequest {
	email: string;
	password: string;
}

interface TokenResponse {
	access_token: string;
	refresh_token: string;
}

const apiURL = process.env.EXPO_PUBLIC_API_URL;

export async function login({
	email,
	password,
}: loginRequest): Promise<TokenResponse> {
	const response = await fetch(`${apiURL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.status === 401) {
		console.log("erro 1");
		throw new Error("Senha incorreta");
	}

	if (response.status === 404) {
		console.log("erro 2");
		throw new Error("Usuário não encontrado");
	}

	if (!response.ok) {
		console.log("erro 3");
		throw new Error("Erro ao fazer login");
	}

	console.log(response.json());
	return await response.json();
}
