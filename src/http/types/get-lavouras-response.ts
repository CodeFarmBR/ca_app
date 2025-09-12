export type GetLavourasAPIResponse = {
	sede_id: number
	nome: string
	lavouras: Array<{
		lavoura_id: number
		nome: string
		tamanho: number
		tipo_solo: string
		tipo_formato: string
		culturas: Array<{
			cliente_cultura: {
				data_inicio: string
				data_fim: string
				cultura: {
					nome: string
					variedade: string
				}
			}
		}>
	}>
}
