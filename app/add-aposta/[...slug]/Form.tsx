"use client";

import {
	Alert,
	AlertColor,
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const Form = ({
	equipes,
	ano,
	serie,
}: {
	equipes: string[];
	ano: number;
	serie: string;
}) => {
	const [posicoes, setPosicoes] = useState<
		{ equipe: string; posicao: number }[]
	>([]);
	const [numeros, setNumeros] = useState([
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	]);
	const [usedNumeros, setUsedNumeros] = useState<number[]>([]);
	const [nome, setNome] = useState("");
	const [disabled, setDisabled] = useState(false);
	const [open, setOpen] = useState(false);
	const [severity, setSeverity] = useState<AlertColor>("info");
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (equipes) {
			const newPosicoes = equipes.map((e) => ({
				equipe: e,
				posicao: 0,
			}));
			setPosicoes(newPosicoes);
		}
	}, [equipes]);

	const onPosicaoChange = (equipe: string, posicao: number) => {
		// gets previous position of this team
		const previousPosition =
			posicoes.find((p) => p.equipe === equipe)?.posicao || 0;

		// adds the new position in the array of used positions
		const usedNumerosNew = [...usedNumeros];
		usedNumerosNew.push(posicao);

		// removes the previous position from the array of used positions
		if (previousPosition) {
			const indexToRemove = usedNumerosNew.indexOf(previousPosition);
			if (indexToRemove !== -1) {
				usedNumerosNew.splice(indexToRemove, 1);
			}
		}

		// now updates Posicoes
		const posicoesNew = posicoes.map((p) =>
			p.equipe === equipe ? { equipe, posicao } : p
		);

		setUsedNumeros(usedNumerosNew);
		setPosicoes(posicoesNew);
	};

	const onFinish = async (e: React.FormEvent) => {
		e.preventDefault();

		const aposta = equipes.map(
			(e) => posicoes.find((p) => p.equipe === e)?.posicao!
		);

		const obj = { ano, serie, nome, aposta };
		setDisabled(true);

		const response = await sendAposta(obj);
	};

	const sendAposta = async (obj: {
		ano: number;
		serie: string;
		nome: string;
		aposta: number[];
	}) => {
		const response = await fetch(`http://localhost:3000/api/add-aposta/`, {
			method: "POST",
			body: JSON.stringify(obj),
		});

		if (response.status === 200) {
			setMessage("Aposta recebida com sucesso");
			setSeverity("success");
			setOpen(true);
		} else {
			const { error } = await response.json();
			setMessage(error);
			setSeverity("error");
			setOpen(true);
			setDisabled(false);
		}
		return;
	};

	const handleClose = () => {
		setOpen(false);
		setMessage("");
	};

	if (!equipes) {
		console.log("no props yet, will return null");
		return null; // no props yet
	}

	return (
		<Container>
			<Typography
				variant="h4"
				style={{
					fontWeight: "bold",
					margin: "0 0 10px 10px",
					textAlign: "center",
				}}
			>
				Adicionar Aposta
			</Typography>

			<form name="basic" onSubmit={(e) => onFinish(e)} autoComplete="off">
				<TextField
					label="Nome"
					name="nome"
					value={nome}
					onChange={(e) => setNome(e.target.value)}
					variant="outlined"
					fullWidth
					required
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
				/>

				{equipes.map((e) => {
					const teamPosicao =
						posicoes.find((p) => p.equipe === e)?.posicao || "";

					return (
						<FormControl
							fullWidth
							variant="outlined"
							margin="normal"
							key={e}
							required
						>
							<InputLabel>{e}</InputLabel>
							<Select
								label={e}
								value={String(teamPosicao)}
								defaultValue=""
								renderValue={(value) => (value ? value : "")}
								onChange={(event) =>
									onPosicaoChange(
										e,
										parseInt(event.target.value)
									)
								}
							>
								{numeros.map((p) => (
									<MenuItem
										value={p}
										key={p}
										disabled={
											usedNumeros.find((n) => n === p) ===
											p
										}
									>
										{p}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					);
				})}

				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={disabled}
					fullWidth
				>
					{disabled ? "Aposta enviada" : "Enviar"}
				</Button>
				<Snackbar
					open={open}
					onClose={handleClose}
					autoHideDuration={10000}
				>
					<Alert severity={severity} sx={{ width: "100%" }}>
						{message}
					</Alert>
				</Snackbar>
			</form>
		</Container>
	);
};

export default Form;
