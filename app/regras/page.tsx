import DataTable from "@/app/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";

const rows = [
	{
		id: "1",
		situacao: "Acerto",
		pontos: 5,
	},
	{
		id: "2",
		situacao: "Errar por 1",
		pontos: 3,
	},
	{
		id: "3",
		situacao: "Errar por 2",
		pontos: 1,
	},
	{
		id: "4",
		situacao: "Errar por 3",
		pontos: 0,
	},
	{
		id: "5",
		situacao: "Errar por 4",
		pontos: -1,
	},
	{
		id: "6",
		situacao: "Errar por 5",
		pontos: -3,
	},
	{
		id: "7",
		situacao: "Errar por 6 ou mais",
		pontos: -5,
	},
];

const columns: GridColDef[] = [
	{
		field: "situacao",
		headerName: "Situação",
		type: "string",
		width: 200,
	},
	{
		field: "pontos",
		headerName: "Pontos",
		type: "string",
		width: 80,
	},
];

const tableData = {
	rows,
	columns,
};

const RegrasPage = () => {
	return <DataTable tableData={tableData} />;
};

export default RegrasPage;
