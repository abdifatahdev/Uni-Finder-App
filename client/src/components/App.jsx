import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./styles.css";
import universitiesMap from "./universities";

function App() {
  const [universityName, setUniversityName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const universityId = universitiesMap.get(universityName);
    const APIKey = "weIg6spfiKIk0fC3wg5omar71jNfWG44FbgK5ghN";
    axios
      .get(
        `https://api.data.gov/ed/collegescorecard/v1/schools.json?id=${universityId}&fields=school.name,2020.student.size&api_key=${APIKey}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => console.log(JSON.stringify(response.data)))
      .catch((err) => console.log(err));

    setUniversityName("");
  };

  // render the form and display the school data if available
  return (
    <Container>
      <div className="App">
        <h1>University Finder App</h1>
      </div>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Type University Name</Form.Label>
          <Form.Control
            type="text"
            value={universityName}
            onChange={(e) => setUniversityName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default App;
