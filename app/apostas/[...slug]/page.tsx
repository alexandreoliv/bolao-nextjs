import DataTable from "@/app/DataTable";
import ResponsiveAppBar from "@/app/NavBar";
import { validateAnoSerieSlug } from "@/utils/validateAnoSerieSlug";
import { GridColDef } from "@mui/x-data-grid";
import { NextResponse } from "next/server";

interface Props {
	params: { slug: string[] };
}

type ApostasObject = {
	// TODO: check whether type or interface should be used
	nome: string;
	aposta: number[];
};

type TabelaObject = {
	// TODO: check whether type or interface should be used
	equipes: string[];
	posicoes: number[];
};

type TableData = {
	rows: any[];
	columns: GridColDef[];
};

type ApostasProps = ApostasObject[];

const getApostas = async (ano: string, serie: string) => {
	const response = await fetch(
		`http://localhost:3000/api/get-apostas/${ano}/${serie}`
	);
	const apostas: ApostasProps = await response.json();
	return apostas;
};

const getTabela = async (ano: string, serie: string) => {
	const response = await fetch(
		`http://localhost:3000/api/get-tabela/${ano}/${serie}`
	);
	const tabela: TabelaObject = await response.json();
	return tabela;
};

const getColumns = (apostas: ApostasProps) => {
	const sortedApostas = apostas.sort((a, b) => (a.nome < b.nome ? -1 : 1)); // sort names alphabetically

	const columns: GridColDef[] = sortedApostas.map((a) => ({
		field: a.nome,
		headerName: a.nome,
		type: "string",
		width: 80,
	}));

	columns.unshift({
		field: `Atual`,
		headerName: "Atual",
		type: "string",
		width: 80,
	});
	columns.unshift({
		field: `Equipe`,
		headerName: "Equipe",
		type: "string",
		width: 130,
	});

	return columns;
};

const getKeys = (apostasColumns: GridColDef[]) => {
	const keys: string[] = apostasColumns.map((c) => c.headerName!);
	return keys;
};

const getRows = (
	apostas: ApostasProps,
	columns: GridColDef[],
	keys: string[],
	tabela: TabelaObject
) => {
	const { equipes, posicoes } = tabela;

	const palpites: any[][] = apostas.map((a) => a.aposta);
	palpites.unshift(posicoes);
	palpites.unshift(equipes);

	const obj = keys.reduce((accumulator, value) => {
		return { ...accumulator, [value]: "" };
	}, {});

	const rows = [];
	for (let j = 0; j < equipes.length; j++) {
		rows[j] = JSON.parse(JSON.stringify(obj));
		for (let i = 0; i < columns.length; i++) {
			rows[j][keys[i]] = palpites[i][j];
			rows[j].id = j;
		}
	}

	// sorts the teams according to their standings
	rows.sort((a, b) => (a.Atual < b.Atual ? -1 : 1));

	return rows;
};

const getTableData = (tabela: TabelaObject, apostas: ApostasProps) => {
	const columns = getColumns(apostas);
	const keys = getKeys(columns);
	const rows = getRows(apostas, columns, keys, tabela);

	const data: TableData = { rows, columns };
	return data;
};

const ApostasPage = async ({ params: { slug } }: Props) => {
	const isValidSlug = validateAnoSerieSlug(slug);
	if (!isValidSlug) return <ResponsiveAppBar />; // TODO: show message to user

	const ano = slug[0];
	const serie = slug[1].toUpperCase();
	const apostas = await getApostas(ano, serie);
	const tabela = await getTabela(ano, serie);
	const tableData = getTableData(tabela, apostas);

	return (
		<>
			<ResponsiveAppBar />
			<DataTable tableData={tableData} />
		</>
	);
};

export default ApostasPage;
