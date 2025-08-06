export type GetClienteAPIResponse = {
	usuario: {
		usuario_id: string
		nome: string
		email: string
		telefone: string
		endereco: string
		tipo_usuario: {
			id_tipo_usuario: number
			tipo_usuario: string
		}
		criado_em: string
	}
	consultor_cadastrou: {
		usuario: {
			nome: string
		}
	}
	consultoria: {
		consultoria_id: number
		nome: string
	}
	nome_empresa: string
	tipo_pessoa: string
	inicio_consultoria: string
	fim_consultoria: string
}
