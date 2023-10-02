import DataTable from "@/app/DataTable";
import Title from "@/components/Title";
import { Props } from "@/types";
import { getApostas, getApostasTableData } from "@/utils/getApostas";
import { getTabela } from "@/utils/getTabela";
import { validateAnoSerieSlug } from "@/utils/validateAnoSerieSlug";

const ApostasPage = async ({ params: { slug } }: Props) => {
	const isValidSlug = validateAnoSerieSlug(slug);
	if (!isValidSlug) return; // TODO: show message to user

	const ano = slug[0];
	const serie = slug[1].toUpperCase();
	const apostas = await getApostas(ano, serie);
	const tabela = await getTabela(ano, serie);
	const tableData = getApostasTableData(tabela, apostas);

	return (
		<>
			<Title title={`Apostas ${ano} Série ${serie}`} />
			<DataTable tableData={tableData} />
		</>
	);
};

export default ApostasPage;
