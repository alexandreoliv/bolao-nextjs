import { Props } from "@/types";
import { equipesA, equipesB } from "@/utils/equipes";
import { validateAddAposta } from "@/utils/validateAddAposta";
import Form from "./Form";

const AddApostaPage = async ({ params: { slug } }: Props) => {
	const isValidSlug = validateAddAposta(slug);
	if (!isValidSlug) return; // TODO: show message to user

	const ano = parseInt(slug[0]);
	const serie = slug[1].toUpperCase();
	const equipes = serie === "A" ? equipesA : equipesB;

	return <Form equipes={equipes} ano={ano} serie={serie} />;
};

export default AddApostaPage;
