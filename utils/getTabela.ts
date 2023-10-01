import { TabelaObject } from "@/types";
import { getTimestamp, isTimestampOld } from "@/utils/getTimestamp";
import { scrapeB } from "@/utils/scrapeB";

const API_KEY = process.env.APIFUTEBOL_KEY;

export const getTabela = async (ano: string, serie: string) => {
	const response = await fetch(
		`http://localhost:3000/api/get-tabela/${ano}/${serie}`
	);
	const tabela: TabelaObject = await response.json();

	if (ano === "2023") {
		const timestamp = getTimestamp(tabela.id);
		const isOld = isTimestampOld(timestamp);
		if (isOld) {
			const newTabela =
				serie === "A"
					? await getTabela2023A(ano, serie)
					: await getTabela2023B(ano, serie);
			return newTabela;
		}
	}
	return tabela;
};

export const getTabela2023A = async (ano: string, serie: string) => {
	if (ano === "2023" && serie === "A") {
		const responseApi = await fetch(
			"https://api.api-futebol.com.br/v1/campeonatos/10/tabela/",
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${API_KEY}`,
				},
			}
		);

		const apiTabela = await responseApi.json();

		const sortedApiTabela = apiTabela.sort(
			(
				a: { time: { nome_popular: string } },
				b: { time: { nome_popular: string } }
			) => a.time.nome_popular.localeCompare(b.time.nome_popular)
		);

		const equipes = sortedApiTabela.map((t: any) => t.time.nome_popular);
		const posicoes = sortedApiTabela.map((t: any) => t.posicao);
		const tabela = { ano: parseInt(ano), serie, equipes, posicoes };

		const responseDb = await fetch(
			`http://localhost:3000/api/add-tabela/`,
			{
				method: "POST",
				body: JSON.stringify(tabela),
			}
		);

		const createdTabela = await responseDb.json();
		return createdTabela;
	}
};

export const getTabela2023B = async (ano: string, serie: string) => {
	if (ano === "2023" && serie === "B") {
		const scrapedTabela = await scrapeB();

		const response = await fetch(`http://localhost:3000/api/add-tabela/`, {
			method: "POST",
			body: JSON.stringify(scrapedTabela),
		});

		const tabela = await response.json();
		return tabela;
	}
};
