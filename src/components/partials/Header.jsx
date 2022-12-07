import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

function Header() {
	return (
		<header>
			<>
				<Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
					<Container>
						<Navbar.Brand>Scheduler</Navbar.Brand>

						<Navbar.Toggle aria-controls="basic-navbar-nav" />
					</Container>
				</Navbar>
			</>
		</header>
	);
}

export default Header;
