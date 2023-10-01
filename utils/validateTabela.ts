import { numeros } from "@/utils/numeros";
import { equipesA, equipesB } from "@/utils/equipes";

export const validateTabela = (body: {
	ano: number;
	serie: string;
	equipes: string[];
	posicoes: number[];
}) => {
	if (!body?.equipes || !body?.posicoes || !body?.ano || !body?.serie)
		return false;
	const { equipes, posicoes, ano, serie } = body;

	if (
		ano === 2023 &&
		typeof serie === "string" &&
		(serie.toUpperCase() === "A" || serie.toUpperCase() === "B") &&
		Array.isArray(equipes) &&
		equipes.length === 20 &&
		[...new Set(equipes)].length === 20 && // not repeating any equipe
		equipes.every((e) => typeof e === "string") && // all equipes are strings
		equipes.every((e) =>
			serie.toUpperCase() === "A"
				? equipesA.includes(e)
				: equipesB.includes(e)
		) && // all equipes belong to the correct serie
		Array.isArray(posicoes) &&
		posicoes.length === 20 &&
		[...new Set(posicoes)].length === 20 && // not repeating any number
		posicoes.every((e) => typeof e === "number") && // all posicoes are numbers
		posicoes.every((e) => numeros.includes(e)) // all posicoes are valid numbers
	)
		return true;

	return false;
};
