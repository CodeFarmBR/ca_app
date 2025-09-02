export type CreateFazendaAPIRequest = {
	nome: string
	localizacao: string
	latitude: number
	longitude: number
	tamanho?: number
	clima_regiao?: string
	cliente_id?: string
}
