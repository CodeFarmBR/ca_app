import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("E-mail inválido").nonempty("O e-mail é obrigatório"),
	senha: z
		.string()
		.min(6, "A senha deve ter no mínimo 6 caracteres")
		.nonempty("Digite a senha"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
