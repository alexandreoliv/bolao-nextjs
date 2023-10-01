"use client";

import { AppBar, Box, Button, Container, Link, Toolbar } from "@mui/material";
import NextLink from "next/link";
import * as React from "react";
import YearMenu from "./YearMenu";

function ResponsiveAppBar() {
	const [anchorEls, setAnchorEls] = React.useState<Array<null | HTMLElement>>(
		[null, null, null, null, null, null, null]
	);

	const years = ["2023", "2022", "2021", "2020"];

	const handleClick =
		(index: number) => (event: React.MouseEvent<HTMLElement>) => {
			const newAnchorEls = [...anchorEls];
			newAnchorEls[index] = event.currentTarget;
			setAnchorEls(newAnchorEls);
		};

	const handleClose = (index: number) => () => {
		const newAnchorEls = [...anchorEls];
		newAnchorEls[index] = null;
		setAnchorEls(newAnchorEls);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{/* Responsive menu for smaller screens */}
					{/* <Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleClick}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleClose}>
									<Typography textAlign="center">
										{page}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box> */}
					{/* Real pages menu */}
					{/* <AdbIcon
						sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
					/>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="#app-bar-with-responsive-menu"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						LOGO
					</Typography> */}
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}
					>
						{years.map((year, index) => (
							<YearMenu
								key={year}
								ano={year}
								handleClick={handleClick(index)}
								anchorEl={anchorEls[index]}
								open={Boolean(anchorEls[index])}
								handleClose={handleClose(index)}
							/>
						))}
						<Button
							sx={{
								my: 2,
								mx: 1,
								color: "white",
								display: "block",
								background: "white",
							}}
						>
							<Link
								href={"/regras"}
								component={NextLink}
								variant="inherit"
								underline="none"
							>
								Regras
							</Link>
						</Button>
						<Button
							sx={{
								my: 2,
								mx: 1,
								color: "white",
								display: "block",
								background: "white",
							}}
						>
							<Link
								href={"/add-aposta/2023/a"}
								component={NextLink}
								variant="inherit"
								underline="none"
							>
								Add Aposta A
							</Link>
						</Button>
						<Button
							sx={{
								my: 2,
								mx: 1,
								color: "white",
								display: "block",
								background: "white",
							}}
						>
							<Link
								href={"/add-aposta/2023/b"}
								component={NextLink}
								variant="inherit"
								underline="none"
							>
								Add Aposta B
							</Link>
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default ResponsiveAppBar;
