import { Button, Link, Menu, MenuItem, Typography } from "@mui/material";
import NextLink from "next/link";
import React from "react";

interface YearMenuProps {
	ano: string;
	handleClick: (event: React.MouseEvent<HTMLElement>) => void;
	anchorEl: null | HTMLElement;
	open: boolean;
	handleClose: () => void;
}

const YearMenu: React.FC<YearMenuProps> = (props) => {
	const { ano, handleClick, anchorEl, open, handleClose } = props;

	return (
		<React.Fragment key={`fragment${ano}`}>
			<Button
				key={`button${ano}`}
				onClick={handleClick}
				sx={{
					my: 2,
					color: "white",
					display: "block",
				}}
			>
				{ano}
			</Button>
			<Menu
				key={`menu${ano}`}
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<Typography>Série A</Typography>
				<MenuItem key={`${ano}page1`} onClick={handleClose}>
					<Link
						href={`/classificacao/${ano}/a`}
						component={NextLink}
						variant="inherit"
						underline="none"
					>
						Classificação
					</Link>
				</MenuItem>
				<MenuItem key={`${ano}page2`} onClick={handleClose}>
					<Link
						href={`/apostas/${ano}/a`}
						component={NextLink}
						variant="inherit"
						underline="none"
					>
						Apostas
					</Link>
				</MenuItem>
				<MenuItem key={`${ano}page3`} onClick={handleClose}>
					<Link
						href={`/distancia/${ano}/a`}
						component={NextLink}
						variant="inherit"
						underline="none"
					>
						Distância
					</Link>
				</MenuItem>

				{ano !== "2020" && <Typography>Série B</Typography>}
				{ano !== "2020" && (
					<MenuItem key={`${ano}page4`} onClick={handleClose}>
						<Link
							href={`/classificacao/${ano}/b`}
							component={NextLink}
							variant="inherit"
							underline="none"
						>
							Classificação
						</Link>
					</MenuItem>
				)}
				{ano !== "2020" && (
					<MenuItem key={`${ano}page5`} onClick={handleClose}>
						<Link
							href={`/apostas/${ano}/b`}
							component={NextLink}
							variant="inherit"
							underline="none"
						>
							Apostas
						</Link>
					</MenuItem>
				)}
				{ano !== "2020" && (
					<MenuItem key={`${ano}page6`} onClick={handleClose}>
						<Link
							href={`/distancia/${ano}/b`}
							component={NextLink}
							variant="inherit"
							underline="none"
						>
							Distância
						</Link>
					</MenuItem>
				)}
			</Menu>
		</React.Fragment>
	);
};

export default YearMenu;
