import { ApostasProps, TabelaObject, TableData } from "@/types";
import { GridColDef } from "@mui/x-data-grid";

export const getApostas = async (ano: string, serie: string) => {
	const response = await fetch(
		`http://localhost:3000/api/get-apostas/${ano}/${serie}`
	);
	const apostas: ApostasProps = await response.json();
	return apostas;
};

export const getApostasColumns = (apostas: ApostasProps) => {
	const sortedApostas = apostas.sort((a, b) => (a.nome < b.nome ? -1 : 1)); // sort names alphabetically

	const columns: GridColDef[] = sortedApostas.map((a) => ({
		field: a.nome,
		headerName: a.nome,
		type: "string",
		width: 80,
	}));

	columns.unshift({
		field: "Atual",
		headerName: "Atual",
		type: "string",
		width: 80,
	});
	columns.unshift({
		field: "Equipe",
		headerName: "Equipe",
		type: "string",
		width: 130,
	});

	return columns;
};

export const getApostasKeys = (apostasColumns: GridColDef[]) => {
	const keys: string[] = apostasColumns.map((c) => c.headerName!);
	return keys;
};

export const getApostasRows = (
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

export const getApostasTableData = (
	tabela: TabelaObject,
	apostas: ApostasProps
) => {
	const columns = getApostasColumns(apostas);
	const keys = getApostasKeys(columns);
	const rows = getApostasRows(apostas, columns, keys, tabela);

	const data: TableData = { rows, columns };
	return data;
};
