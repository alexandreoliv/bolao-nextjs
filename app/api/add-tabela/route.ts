import { prisma } from "@/prisma/client";
import { validateTabela } from "@/utils/validateTabela";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();

	const isValidTabela = validateTabela(body);
	if (!isValidTabela) {
		return NextResponse.json({ error: "Tabela inválida" }, { status: 400 });
	}

	const { equipes, posicoes, ano } = body;
	const serie = body.serie.toUpperCase();

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
