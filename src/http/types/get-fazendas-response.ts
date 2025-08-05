export type GetFazendasAPIResponse = Array<{
	fazenda_id: number
	nome: string
	localizacao: string
	latitude: number
	longitude: number
	tamanho: number
	clima_regiao: string
	cliente: {
		usuario_id: string
		usuario: {
			nome: string
		}
	}
}>
