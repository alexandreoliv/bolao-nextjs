import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { validateAnoSerieSlug } from "@/utils/validateAnoSerieSlug";

export async function GET(
	request: NextRequest,
	{ params }: { params: { slug: string[] } }
) {
	const { slug } = params;
	const isValidSlug = validateAnoSerieSlug(slug);
	if (!isValidSlug) {
		return NextResponse.json(
			{ error: "Ano ou série inválidos" },
			{ status: 404 }
		);
	}

	const ano = parseInt(slug[0]);
	const serie = slug[1].toUpperCase();

	const aposta = await prisma.apostas.findMany({
		where: {
			ano: ano,
			serie: serie,
		},
		select: {
			nome: true,
			aposta: true,
		},
	});

	if (!aposta)
		return NextResponse.json(
			{ error: "Aposta não encontrada" },
			{ status: 404 }
		);

	return NextResponse.json(aposta);
}
