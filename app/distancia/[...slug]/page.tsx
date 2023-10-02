import DataTable from "@/app/DataTable";
import Title from "@/components/Title";
import { Props } from "@/types";
import { getApostas } from "@/utils/getApostas";
import { getDistanciaTableData } from "@/utils/getDistancia";
import { getTabela } from "@/utils/getTabela";
import { validateAnoSerieSlug } from "@/utils/validateAnoSerieSlug";

const DistanciaPage = async ({ params: { slug } }: Props) => {
	const isValidSlug = validateAnoSerieSlug(slug);
	if (!isValidSlug) return; // TODO: show message to user

	const ano = slug[0];
	const serie = slug[1].toUpperCase();
	const apostas = await getApostas(ano, serie);
	const tabela = await getTabela(ano, serie);
	const tableData = getDistanciaTableData(tabela, apostas);

	return (
		<>
			<Title title={`Distância ${ano} Série ${serie}`} />
			<DataTable tableData={tableData} />
		</>
	);
};

export default DistanciaPage;
