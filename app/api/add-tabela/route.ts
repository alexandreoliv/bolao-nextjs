import { prisma } from "@/prisma/client";
import { validateTabela } from "@/utils/validateTabela";
import { NextRequest, NextResponse } from "next/server";

const tableNotFoundResponse = NextResponse.json(
	{ error: "Tabela anterior não encontrada" },
	{ status: 404 }
);

const tableNotDeletedResponse = NextResponse.json(
	{ error: "Tabela anterior não pôde ser deletada" },
	{ status: 400 }
);

const tableNotCreatedResponse = NextResponse.json(
	{ error: "Tabela não pôde ser criada" },
	{ status: 400 }
);

export async function POST(request: NextRequest) {
	const body: {
		ano: number;
		serie: string;
		equipes: string[];
		posicoes: number[];
	} = await request.json();

	const isValidTabela = validateTabela(body);
	if (!isValidTabela) {
		return NextResponse.json({ error: "Tabela inválida" }, { status: 400 });
	}

	const { equipes, posicoes, ano } = body;
	const serie = body.serie.toUpperCase();

	const existingTabela = await prisma.tabelas.findFirst({
		where: {
			ano,
			serie,
		},
		select: {
			id: true,
		},
	});

	if (!existingTabela) return tableNotFoundResponse;

	const deletedTabela = await prisma.tabelas.delete({
		where: {
			id: existingTabela.id,
		},
	});

	if (!deletedTabela) return tableNotDeletedResponse;

	const createdTabela = await prisma.tabelas.create({
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

	if (!createdTabela) return tableNotCreatedResponse;

	return NextResponse.json(createdTabela);
}
