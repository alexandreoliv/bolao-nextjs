import { Alert, AlertColor, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

interface ApostaSnackbarProps {
	severity: AlertColor;
	message: string;
}

const ApostaSnackbar: React.FC<ApostaSnackbarProps> = (props) => {
	const [open, setOpen] = useState(false);
	const [severity, setSeverity] = useState<AlertColor>("info");
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (props.severity) {
			setSeverity(props.severity);
		}

		if (props.message) {
			setMessage(props.message);
			setOpen(true);
		}
	}, [props.severity, props.message]);

	const handleClose = () => {
		setOpen(false);
		setMessage("");
	};

	return (
		<Snackbar open={open} onClose={handleClose} autoHideDuration={10000}>
			<Alert severity={severity} sx={{ width: "100%" }}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default ApostaSnackbar;
