import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Autocomplete,
  FormGroup,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Button, Col, Container, Form, FormLabel, Row } from "react-bootstrap";
import axios from "axios";
import "./styles.css";
import Hero from "./hero";
import universitiesMap from "./universities";

let universitiesList = [...universitiesMap.keys()];

export default function App() {
  const [institution, setInstitution] = useState(universitiesList[0]);
  const [transfer, setTransfer] = useState("");
  const [satScores, setSatScores] = useState(null);
  console.log({ satScores });

  const submitHandler = (e) => {
    e.preventDefault();

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
          `https://api.data.gov/ed/collegescorecard/v1/schools.json?id=${universityID}&fields=school.name,2020.student.size&api_key=${APIKey}`
        )
        .then((response) => console.log(JSON.stringify(response.data)))
        .catch((err) => console.log(err));
    } else {
      toast.error("Please select or type university name.", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
    }

    setInstitution(universitiesList[0]);
  };

  const handleChanged = (e) => {
    const universityID = universitiesMap.get(institution);
    if (
      e.target.value === "no" &&
      setSatScores(e.target.value) === null &&
      universityID !== "000000"
    ) {
      toast.error("Please fill out SAT scores section.", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
    }
    setTransfer(e.target.value);
    setSatScores(e.target.value);

    // console.log(setSatScores(e.target.value));
  };

  return (
    <div>
      <Hero />
      <Container>
        <Form onSubmit={submitHandler} className="col-md-6 form">
          <FormGroup>
            <FormLabel style={{ marginBottom: "1.5em" }}>
              Select your dream college
            </FormLabel>
            <Autocomplete
              options={universitiesList}
              value={institution}
              onChange={(e, v) => setInstitution(v)}
              renderInput={(params) => (
                <TextField {...params} label="Select a university" />
              )}
            />

            {/*Form control starts here*/}
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Are you transfer student?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio required={true} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio required={true} />}
                  label="No"
                />
              </RadioGroup>

              {/*For yes answer*/}
              <Form.Group className="mb-3" controlId="formBasicGPA">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  What is your GPA?
                </FormLabel>
                <Form.Control type="number" step="0.1" min="0" max="4.0" />
              </Form.Group>

              {/*For no answer*/}
              <FormLabel id="demo-row-radio-buttons-group-label">
                What is your SAT scores?
              </FormLabel>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formBasicSAT"
                value={satScores}
              >
                <Form.Label column sm="2">
                  Reading
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="number" step="0.1" min="200" max="800" />
                </Col>
                <Form.Label column sm="2">
                  Math
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="number" step="0.1" min="200" max="800" />
                </Col>
                <Form.Label column sm="2">
                  Writing
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="number" step="0.1" min="200" max="800" />
                </Col>
              </Form.Group>
            </FormControl>
            {/*Form control ends here*/}
          </FormGroup>
          <Button
            className="form-btn"
            type="submit"
            value={transfer}
            onChange={handleChanged}
          >
            see if you quality
          </Button>
        </Form>
      </Container>

      <ToastContainer className="toast-position" />
    </div>
  );
}
