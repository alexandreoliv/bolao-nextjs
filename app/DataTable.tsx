"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

type TableData = {
	rows: any[];
	columns: GridColDef[];
};

export default function DataTable({ tableData }: { tableData: TableData }) {
	return (
		<div style={{ height: "100%", width: "100%" }}>
			<DataGrid
				rows={tableData.rows}
				columns={tableData.columns}
				hideFooter
			/>
		</div>
	);
}
