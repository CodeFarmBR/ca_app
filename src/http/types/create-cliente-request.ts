export type CreateClienteAPIRequest = {
	nome: string
	email: string
	nome_empresa?: string
	telefone?: string
	endereco?: string
	consultor_cadastrou_id?: string
	consultoria_id?: number
}
