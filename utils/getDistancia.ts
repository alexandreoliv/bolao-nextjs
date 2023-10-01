import { ApostasProps, TabelaObject, TableData } from "@/types";
import {
	getApostasColumns,
	getApostasKeys,
	getApostasRows,
} from "@/utils/getApostas";
import { GridColDef } from "@mui/x-data-grid";

export const getDistanciaTableData = (
	tabela: TabelaObject,
	apostas: ApostasProps
) => {
	const apostasColumns = getApostasColumns(apostas);
	const apostasKeys = getApostasKeys(apostasColumns);
	const apostasRows = getApostasRows(
		apostas,
		apostasColumns,
		apostasKeys,
		tabela
	);

	const rows = getDistanciaRows(apostasRows, apostasKeys);
	const columns = getDistanciaColumns(apostas);

	const data: TableData = { rows, columns };
	return data;
};

const getDistanciaRows = (apostasRows: any[], apostasKeys: string[]) => {
	return apostasRows
		.map((row, i) => {
			const distanciaRow = { ...row };
			for (let j = 2; j < apostasKeys.length; j++) {
				// ignoring "Equipe" and "Atual"
				distanciaRow[apostasKeys[j]] = row[apostasKeys[j]] - row.Atual;
			}
			distanciaRow.id = i;
			return distanciaRow;
		})
		.sort((a, b) => a.Atual - b.Atual);
};

export const getDistanciaColumns = (apostas: ApostasProps) => {
	const colours = [
		"#5cbd8c",
		"#76c79f",
		"#91d2b2",
		"#addec5",
		"#c8e9d9",
		"#e3f3eb",
		"#ffffff",
		"#fef6f6",
		"#fcecec",
		"#f9e2e3",
		"#f7d9d9",
		"#f6d0ce",
		"#f4c5c4",
		"#f2bcbb",
		"#f0b2b1",
		"#eda8a8",
		"#ec9f9d",
		"#ea9595",
		"#e88b8a",
		"#e68181",
	];

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
