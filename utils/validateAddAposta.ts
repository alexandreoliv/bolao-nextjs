export const validateAddAposta = (slug: string[]) => {
	if (slug.length !== 2) return false;
	const ano = parseInt(slug[0]);
	const serie = slug[1].toUpperCase();

	if ((serie === "A" || serie === "B") && ano === 2023) return true;

	return false;
};
