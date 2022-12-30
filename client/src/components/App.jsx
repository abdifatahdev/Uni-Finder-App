import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./styles.css";
import universitiesMap from "./universities";
import { useEffect } from "react";

function App() {
  const [universities, setUniversities] = useState([]);
  const [instituion, setInstituion] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const submitHandler = (e) => {
    e.preventDefault();

    // const universityId = universitiesMap.get(universityName);
    // const APIKey = "weIg6spfiKIk0fC3wg5omar71jNfWG44FbgK5ghN";
    // axios
    //   .get(
    //     `https://api.data.gov/ed/collegescorecard/v1/schools.json?id=${universityId}&fields=school.name,2020.student.size&api_key=${APIKey}`,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then((response) => console.log(JSON.stringify(response.data)))
    //   .catch((err) => console.log(err));

    setInstituion('')
  };

  useEffect(() => {
    setUniversities(loadAllUniversities())
    loadAllUniversities()
  }, []) 

  const loadAllUniversities = () => {
    const universitiesMap = new Map([
      ["University of Houston", "225511"],
      ["Oregon State University", "209542"],
      ["University of Massachusetts-Boston", "166638"],
      ["Harvard University", "166027"],
      ["University of Florida", "484473"],
      ["Florida State University", "484173"]
    ]);
    let universitiesList =[ ...universitiesMap.keys()];
    return universitiesList
  }

  const handleInstituionName = (userInput) => {
    let matches = [];
    console.log(userInput);
    if (userInput.length > 0) {
      matches = universities.filter(uni => {
        const regex = new RegExp(`${userInput}`, "gi");
        return uni.match(regex);
      })
    }
    console.log('matches: ', matches);
    setSuggestions(matches);
    setInstituion(userInput);
    console.log(userInput);
  }

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
            value={instituion}
            onChange={e => handleInstituionName(e.target.value)}
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
