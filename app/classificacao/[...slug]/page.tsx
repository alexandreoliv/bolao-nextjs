import DataTable from "@/app/DataTable";
import { Props } from "@/types";
import { getApostas } from "@/utils/getApostas";
import { getClassificacaoTableData } from "@/utils/getClassificacao";
import { getTabela } from "@/utils/getTabela";
import { validateAnoSerieSlug } from "@/utils/validateAnoSerieSlug";

const ClassificacaoPage = async ({ params: { slug } }: Props) => {
	const isValidSlug = validateAnoSerieSlug(slug);
	if (!isValidSlug) return; // TODO: show message to user

	const ano = slug[0];
	const serie = slug[1].toUpperCase();
	const apostas = await getApostas(ano, serie); // TODO: add error handling
	const tabela = await getTabela(ano, serie); // TODO: add error handling
	const tableData = getClassificacaoTableData(tabela, apostas);

	return <DataTable tableData={tableData} />;
};

export default ClassificacaoPage;
