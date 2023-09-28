export const validateAnoSerieSlug = (slug: string[]) => {
	if (slug.length !== 2) return false;
	const ano = parseInt(slug[0]);
	const serie = slug[1].toUpperCase();
	const validYearsA = [2020, 2021, 2022, 2023];
	const validYearsB = [2021, 2022, 2023];

	if (serie === "A" && validYearsA.includes(ano)) return true;
	else if (serie === "B" && validYearsB.includes(ano)) return true;
	return false;
};
