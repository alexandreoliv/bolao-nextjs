import { NextResponse } from "next/server";
import { scrapeB } from "./scrapeB";

const API_KEY = process.env.APIFUTEBOL_KEY;

export const getTabela2023A = async (ano, serie) => {
	// API method:
	if (ano === "2023" && serie === "A") {
		// 	// offline way:
		// 	let tabela = require("../data/tabela2023A.json");

		// online way:
		const response = await fetch(
			"https://api.api-futebol.com.br/v1/campeonatos/10/tabela/",
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${API_KEY}`,
				},
			}
		);

		let tabela = await response.json();

		// for both ways:
		tabela.sort((a, b) =>
			a.time.nome_popular.localeCompare(b.time.nome_popular)
		);
		const equipes = tabela.map((t) => t.time.nome_popular);
		const posicoes = tabela.map((t) => t.posicao);
		tabela = { ano: parseInt(ano), serie, equipes, posicoes };

		const responseDb = await fetch(
			`http://localhost:3000/api/add-tabela/`,
			{
				method: "POST",
				body: JSON.stringify(tabela),
			}
		);
		const newTabela = await responseDb.json();
		return newTabela;
	}
};

export const getTabela2023B = async (ano, serie) => {
	// API method:
	if (ano === "2023" && serie === "B") {
		// 	// offline way:
		// 	let tabela = require("../data/tabela2023A.json");

		// online way:
		const tabela = await scrapeB();

		const response = await fetch(`http://localhost:3000/api/add-tabela/`, {
			method: "POST",
			body: JSON.stringify(tabela),
		});
		const newTabela = await response.json();
		return newTabela;
	}
};