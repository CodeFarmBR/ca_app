// model/Post.js
import { Model } from "@nozbe/watermelondb"
import { text } from "@nozbe/watermelondb/decorators"

export default class Cliente extends Model {
	static table = "clientes"

	@text("nome") nome: string | undefined
	@text("email") email: string | undefined
	@text("nome_empresa") nomeEmpresa: string | undefined
	@text("consultoria") consultoria: string | undefined
}
