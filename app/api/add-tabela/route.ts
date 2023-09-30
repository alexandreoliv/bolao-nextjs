import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
// import { validateAnoSerieSlug } from "@/utils/validateAnoSerieSlug";

// const validateAposta = (body: {
// 	ano: number;
// 	serie: string;
// 	nome: string;
// 	aposta: number[];
// }) => {
// 	if (!body?.aposta || !body?.nome || !body?.ano || !body?.serie)
// 		return false;
// 	const { aposta, nome, ano, serie } = body;

// 	if (ano !== 2023) return false;

// 	if (aposta?.length !== 20) return false;

// 	if (typeof nome !== "string" || typeof serie !== "string") return false;

// 	if (serie.toUpperCase() !== "A" && serie.toUpperCase() !== "B")
// 		return false;

// 	return true;
// };

export async function POST(request: NextRequest) {
	const body = await request.json();

	// const isValidAposta = validateAposta(body);
	// if (!isValidAposta) {
	// 	return NextResponse.json({ error: "Aposta inválida" }, { status: 400 });
	// }

	const { equipes, posicoes, ano } = body;
	const serie = body.serie.toUpperCase();
	if (ano !== 2023) return;

	let tabelaExists = await prisma.tabelas.findFirst({
		where: {
			ano,
			serie,
		},
	});

	if (tabelaExists) {
		let response = await prisma.tabelas.deleteMany({
			where: {
				ano,
				serie,
			},
		});

		if (response) tabelaExists = false;

		if (!tabelaExists) {
			response = await prisma.tabelas.create({
				data: {
					ano,
					serie,
					equipes,
					posicoes,
					v: 0,
				},
				select: {
					ano: true,
					serie: true,
					equipes: true,
					posicoes: true,
				},
			});

			return NextResponse.json(response);
		}
	}
}
