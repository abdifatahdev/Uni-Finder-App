import React from "react";
import { Container } from "react-bootstrap";
import "./styles.css";

const Footer = () => (
  <footer>
    <Container className="footer-upper">
      <section className="">
        <p className="d-flex justify-content-center align-items-center">
          <span className="me-3">
            Powered by{" "}
            <a
              href="https://collegescorecard.ed.gov/data"
              target="_blank"
              rel="noreferrer"
            >
              College Scoredcard
            </a>{" "}
            Data <span style={{ textDecoration: "underline" }}>v2.10.0</span>
          </span>
        </p>
      </section>
    </Container>
    <div className="text-center p-3 footer-lower">
      ©2023 Copyright{" | "}
      <a href={() => false}>unifinder.com</a> {" | "} All Rights Reserved.
    </div>
  </footer>
);

export default Footer;
