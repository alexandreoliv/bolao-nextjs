import DataTable from "@/app/DataTable";
import ResponsiveAppBar from "@/app/NavBar";
import { validateAnoSerieSlug } from "@/utils/validateAnoSerieSlug";
import { NextResponse } from "next/server";

interface Props {
	params: { slug: string[] };
}

const getApostas = async (ano: string, serie: string) => {
	const response = await fetch(
		`http://localhost:3000/api/get-apostas/${ano}/${serie}`
	);
	const apostas = await response.json();
	return apostas;
};

const getTabela = async (ano: string, serie: string) => {
	const response = await fetch(
		`http://localhost:3000/api/get-tabela/${ano}/${serie}`
	);
	const tabela = await response.json();
	return tabela;
};

const ApostasPage = async ({ params: { slug } }: Props) => {
	const isValidSlug = validateAnoSerieSlug(slug);
	if (!isValidSlug) {
		return NextResponse.json(
			{ error: "Ano ou série inválidos" },
			{ status: 404 }
		);
	}

	const ano = slug[0];
	const serie = slug[1].toUpperCase();
	const apostas = await getApostas(ano, serie);
	const tabela = await getTabela(ano, serie);

	return (
		<>
			<ResponsiveAppBar />
			<DataTable />;
		</>
	);
};

export default ApostasPage;
