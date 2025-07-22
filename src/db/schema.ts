import { appSchema, tableSchema } from "@nozbe/watermelondb"

export default appSchema({
	version: 1,
	tables: [
		tableSchema({
			name: "clientes",
			columns: [
				{ name: "nome", type: "string" },
				{ name: "email", type: "string" },
				{ name: "nome_empresa", type: "string" },
				{ name: "consultoria", type: "string" },
			],
		}),
	],
})
