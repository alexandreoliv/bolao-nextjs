import { Props } from "@/types";
import { getTabela } from "@/utils/getClassificacao";
import { validateAnoSerieSlug } from "@/utils/validateAnoSerieSlug";
import Form from "./Form";

const AddApostaPage = async ({ params: { slug } }: Props) => {
	const isValidSlug = validateAnoSerieSlug(slug);
	if (!isValidSlug) return; // TODO: show message to user

	const ano = slug[0];
	const serie = slug[1].toUpperCase();
	const { equipes }: { equipes: string[] } = await getTabela(ano, serie);

	return <Form equipes={equipes} ano={parseInt(ano)} serie={serie} />;
};

export default AddApostaPage;
