import { ApostasProps, TabelaObject, TableData } from "@/types";
import { GridColDef } from "@mui/x-data-grid";
import {
	getApostasColumns,
	getApostasKeys,
	getApostasRows,
} from "./getApostas";
import { getTabela2023A, getTabela2023B } from "./getTabela";
import { getTimestamp, isTimestampOld } from "./getTimestamp";

export const getTabela = async (ano: string, serie: string) => {
	const response = await fetch(
		`http://localhost:3000/api/get-tabela/${ano}/${serie}`
	);
	const tabela: TabelaObject = await response.json();
	if (ano === "2023") {
		const timestamp = getTimestamp(tabela.id);
		const isOld = isTimestampOld(timestamp);
		console.log({ isOld });
		if (isOld) {
			const newTabela =
				serie === "A"
					? await getTabela2023A(ano, serie)
					: await getTabela2023B(ano, serie);
			return newTabela;
		}
	}
	return tabela;
};

export const getClassificacaoTableData = (
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

	const filteredKeys = apostasKeys.filter(
		(k) => k !== "Equipe" && k !== "Atual"
	);
	const pontuacaoDetalhada = getPontuacaoDetalhada(filteredKeys, apostasRows);
	const pontuacaoFinal = getPontuacaoFinal(pontuacaoDetalhada);

	const rows = getClassificacaoRows(filteredKeys, pontuacaoFinal);
	const columns = getClassificacaoColumns();

	const data: TableData = { rows, columns };
	return data;
};

const getPontuacaoDetalhada = (
	filteredKeys: string[],
	apostasRows: { [key: string]: number }[]
): number[][] => {
	return filteredKeys.map((k) =>
		apostasRows.map((e) => calculaPontuacao(e[k] - e["Atual"])!)
	);
};

const calculaPontuacao = (distancia: number) => {
	if (distancia === 0) return 5;
	if (Math.abs(distancia) === 1) return 3;
	if (Math.abs(distancia) === 2) return 1;
	if (Math.abs(distancia) === 3) return 0;
	if (Math.abs(distancia) === 4) return -1;
	if (Math.abs(distancia) === 5) return -3;
	if (Math.abs(distancia) >= 6) return -5;
};

const getPontuacaoFinal = (pontuacaoDetalhada: number[][]) => {
	return pontuacaoDetalhada.map((p) =>
		p.reduce((prev, cur) => prev + cur, 0)
	);
};

const getClassificacaoRows = (
	filteredKeys: string[],
	pontuacaoFinal: number[]
) => {
	const classificacaoData: {
		id: number;
		nome: string;
		pontuacao: number;
		posicao: number;
	}[] = filteredKeys.map((nome, i) => ({
		id: i,
		nome,
		pontuacao: pontuacaoFinal[i],
		posicao: 0,
	}));

	classificacaoData.sort((a, b) => b.pontuacao - a.pontuacao);
	return addPosicaoApostador(classificacaoData);
};

const addPosicaoApostador = (
	classificacaoData: {
		id: number;
		nome: string;
		pontuacao: number;
		posicao: number;
	}[]
) => {
	const sortedData = [...classificacaoData].sort(
		(a, b) => b.pontuacao - a.pontuacao
	);

	const result = sortedData.map((item, index) => {
		item.posicao =
			index === 0 || item.pontuacao !== sortedData[index - 1].pontuacao
				? index + 1
				: sortedData[index - 1].posicao;
		return item;
	});

	return result;
};

const getClassificacaoColumns = () => {
	const columns: GridColDef[] = [
		{
			field: "posicao",
			headerName: "Posição",
			type: "string",
			width: 80,
		},
		{
			field: "nome",
			headerName: "Nome",
			type: "string",
			width: 130,
		},
		{
			field: "pontuacao",
			headerName: "Pontuação",
			type: "string",
			width: 80,
		},
	];
	return columns;
};
