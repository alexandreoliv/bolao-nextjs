import { GridColDef } from "@mui/x-data-grid";

export interface Props {
	params: { slug: string[] };
}

export type ApostasObject = {
	// TODO: check whether type or interface should be used
	nome: string;
	aposta: number[];
};

export type TabelaObject = {
	// TODO: check whether type or interface should be used
	equipes: string[];
	posicoes: number[];
};

export type TableData = {
	rows: any[];
	columns: GridColDef[];
};

export type ApostasProps = ApostasObject[];
