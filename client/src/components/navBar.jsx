import { Navbar, Container } from "react-bootstrap";

export default function NavigationBar() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home" className="mr-auto">
          <img
            alt=""
            src="https://university-finder.s3.amazonaws.com/unifinder-logo.svg"
            width="170"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
