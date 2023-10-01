import { numeros } from "@/utils/numeros";

export const validateAposta = (body: {
	ano: number;
	serie: string;
	nome: string;
	aposta: number[];
}) => {
	if (!body?.aposta || !body?.nome || !body?.ano || !body?.serie)
		return false;
	const { aposta, nome, ano, serie } = body;

	if (
		ano === 2023 &&
		typeof serie === "string" &&
		(serie.toUpperCase() === "A" || serie.toUpperCase() === "B") &&
		typeof nome === "string" &&
		Array.isArray(aposta) &&
		aposta.length === 20 &&
		[...new Set(aposta)].length === 20 && // not repeating any number
		aposta.every((e) => typeof e === "number") && // all elements are numbers
		aposta.every((e) => numeros.includes(e)) // all elements are valid numbers
	)
		return true;

	return false;
};
