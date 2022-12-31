/*
  DEPRECATED DEPRECATED DEPRECATED DEPRECATED DEPRECATED 
*/

import React, { useState } from "react";
import { Container, Form, Button, ListGroup } from "react-bootstrap";
import axios from "axios";
import "./styles.css";
import universitiesMap from "./universities";
import { useEffect } from "react";
import { useDebounce } from "../hooks/debounceHooks";

function App() {
  const [universities, setUniversities] = useState([]);
  const [institution, setInstitution] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [noUniversityFound, setNoUniversityFound] = useState(false);

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

    setInstitution("");
  };

  useEffect(() => {
    setUniversities(loadAllUniversities());
    loadAllUniversities();
  }, []);

  const loadAllUniversities = () => {
    let universitiesList = [...universitiesMap.keys()];
    return universitiesList;
  };

  const handleInstitutionName = (userInput) => {
    let matches = [];
    console.log(userInput);
    // previous implementation of userInput.length was causing a bug 
    // because we were checking the length of undefinied value 
    if (userInput !== undefined) {
      matches = universities.filter((uni) => {
        const regex = new RegExp(`${userInput}`, "gi");
        return uni.match(regex);
      });
    }
    if (matches) {
      if (matches && matches.length === 0) {
        setNoUniversityFound(true);
      }
      setSuggestions(matches);
      setInstitution(userInput);
    }
  };

  const notFound = !institution || institution.length === 0;

  // It will prevent hitting API when user types every single character
  // Wait 500 milliseconds until user finishes typing
  useDebounce(universities, 500, handleInstitutionName);

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
            value={institution}
            onChange={(e) => handleInstitutionName(e.target.value)}
          />

          {suggestions &&
            suggestions.map((suggestion, i) => (
              <div key={i}>
                <ListGroup>
                  <ListGroup.Item>
                    {notFound && !noUniversityFound && (
                      <p className="notFound">No school or university found</p>
                    )}
                    {suggestion}
                  </ListGroup.Item>
                </ListGroup>
              </div>
            ))}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default App;
