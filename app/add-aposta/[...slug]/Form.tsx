"use client";

import { numeros } from "@/utils/numeros";
import {
	AlertColor,
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ApostaSnackbar from "./Snackbar";

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
	const [usedNumeros, setUsedNumeros] = useState<number[]>([]);
	const [nome, setNome] = useState("");
	const [disabled, setDisabled] = useState(false);
	const [snackbarData, setSnackbarData] = useState<{
		message: string;
		severity: AlertColor;
	}>({ message: "", severity: "info" });

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

		// resets the message to ensure Snackbar appears again in case of consecutive identical error messages
		setSnackbarData({ message: "", severity: "info" });

		if (response.status === 200) {
			setSnackbarData({
				message: "Aposta recebida com sucesso",
				severity: "success",
			});
		} else {
			const { error } = await response.json();
			setSnackbarData({ message: error, severity: "error" });
			setDisabled(false);
		}
	};

	if (!equipes) {
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
			</form>
			{snackbarData.message && (
				<ApostaSnackbar
					message={snackbarData.message}
					severity={snackbarData.severity}
				/>
			)}
		</Container>
	);
};

export default Form;
