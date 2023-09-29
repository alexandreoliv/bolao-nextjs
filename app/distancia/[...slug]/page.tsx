import DataTable from "@/app/DataTable";
import ResponsiveAppBar from "@/app/NavBar";
import { Props } from "@/types";
import { getApostas } from "@/utils/getApostas";
import { getTabela } from "@/utils/getClassificacao";
import { getDistanciaTableData } from "@/utils/getDistancia";
import { validateAnoSerieSlug } from "@/utils/validateAnoSerieSlug";

const DistanciaPage = async ({ params: { slug } }: Props) => {
	const isValidSlug = validateAnoSerieSlug(slug);
	if (!isValidSlug) return <ResponsiveAppBar />; // TODO: show message to user

	const ano = slug[0];
	const serie = slug[1].toUpperCase();
	const apostas = await getApostas(ano, serie);
	const tabela = await getTabela(ano, serie);
	const tableData = getDistanciaTableData(tabela, apostas);

	return (
		<>
			<ResponsiveAppBar />
			<DataTable tableData={tableData} />
		</>
	);
};

export default DistanciaPage;
