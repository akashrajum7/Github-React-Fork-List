import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./Header.css";

function Header() {
  return (
    <Container>
      <Navbar className="justify-content-around">
        <Navbar.Brand>
          <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
          <span>react-fork-list</span>
        </Navbar.Brand>
      </Navbar>
    </Container>
  );
}

export default Header;
