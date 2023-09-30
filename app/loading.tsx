import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LoadingPage = () => {
	return (
		<Box display="flex" justifyContent="center" height="100vh">
			<p>
				Carregando...
				<CircularProgress size={20} sx={{ margin: "10px 0 0 10px" }} />
			</p>
		</Box>
	);
};

export default LoadingPage;
