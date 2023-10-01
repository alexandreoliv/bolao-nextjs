import { prisma } from "@/prisma/client";
import { validateAposta } from "@/utils/validateAposta";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();

	const isValidAposta = validateAposta(body);
	if (!isValidAposta) {
		return NextResponse.json({ error: "Aposta inválida" }, { status: 400 });
	}

	const { aposta, nome, ano } = body;
	const serie = body.serie.toUpperCase();

	const response = await prisma.apostas.create({
		data: {
			nome,
			serie,
			ano,
			aposta,
			v: 0,
		},
	});

	return NextResponse.json(response);
}
