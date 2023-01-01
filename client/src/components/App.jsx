import React, { useState } from "react";
import { TextField, Autocomplete, FormGroup } from '@mui/material';
import { Button, Container, Form, FormLabel } from "react-bootstrap";
import axios from "axios";
import "./styles.css";
import Hero from "./hero";
import universitiesMap from "./universities";

let universitiesList = [...universitiesMap.keys()];

export default function App() {
  const [institution, setInstitution] = useState(universitiesList[0]);

  const submitHandler = e => {
    e.preventDefault()

    /**
     * universityID
     * is student transfer (true, false)
     * if previous is true: (GPA)
     * if previous is false: (SAT scores)
     * 
     * Java code will handle most of the logic and the api request
     */

    const universityID = universitiesMap.get(institution);
    console.log(universityID);
    if (universityID !== "000000") {
      const APIKey = "weIg6spfiKIk0fC3wg5omar71jNfWG44FbgK5ghN";
      axios
        .get(
          `https://api.data.gov/ed/collegescorecard/v1/schools.json?id=${universityID}&fields=school.name,2020.student.size&api_key=${APIKey}`)
        .then((response) => console.log(JSON.stringify(response.data)))
        .catch((err) => console.log(err));
    }

    setInstitution(universitiesList[0])
  }

  return (
    <div>
      <Hero />
      <Container>
        <Form onSubmit={submitHandler} className="col-md-6">
          <FormGroup>
            <FormLabel style={{ marginBottom: '1.5em' }}>Select your dream college</FormLabel>
            <Autocomplete
              options={universitiesList}
              value={institution}
              onChange={(e, v) => setInstitution(v)}
              renderInput={(params) => <TextField {...params} label="Select a university" />}
            />
          </FormGroup>
          <Button className="form-btn" type="submit">see if you quality</Button>
        </Form>
      </Container>
    </div>

  );
}
