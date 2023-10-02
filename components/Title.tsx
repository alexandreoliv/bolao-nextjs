import { Typography } from "@mui/material";

const Title: React.FC<{ title: string }> = ({ title }) => {
	return (
		<Typography
			variant="h6"
			style={{
				fontWeight: "bold",
				margin: "15px 0",
				textAlign: "center",
			}}
		>
			{title}
		</Typography>
	);
};

export default Title;
