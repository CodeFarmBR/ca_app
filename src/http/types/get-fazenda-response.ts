export type GetFazendaAPIResponse = {
	fazenda_id: number
	nome: string
	sedes: Array<{
		sede_id: number
		nome: string
		localizacao: string
		latitude: number
		longitude: number
		descricao: string
	}>
}
