import z from "zod"

export const addClienteSchema = z.object({
	nome: z
		.string()
		.min(3, "O nome é obrigatório e deve conter 3 ou mais caracteres"),
	email: z.string().min(1, "O e-mail é obrigatório").email("E-mail inválido"),
	telefone: z.number(),
	endereco: z.string(),
})

export type AddClienteFormData = z.infer<typeof addClienteSchema>
