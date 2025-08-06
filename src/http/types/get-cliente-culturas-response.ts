export type GetClienteCulturasAPIResponse = Array<{
	cliente_cultura_id: number
	cultura: {
		cultura_id: number
		nome: string
		variedade: string
		ano_safra: string
	}
	data_inicio: string
	data_fim: string
}>
