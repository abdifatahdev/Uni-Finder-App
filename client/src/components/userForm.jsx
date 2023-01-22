import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Button, Col, Container, Form, Row, Toast } from "react-bootstrap";
import axios from "axios";
import "./styles.css";
import universitiesMap from "./universities";

let universitiesList = [...universitiesMap.keys()];

export default function App() {
  const [studentName, setStudentName] = useState("");
  const [institution, setInstitution] = useState("");
  const [isTransfer, setIsTransfer] = useState("");
  const [gpa, setGpa] = useState("");
  const [readingWriting, setReadingWriting] = useState("");
  const [math, setMath] = useState("");
  const [uniFinderAppErrors, setUniFinderAppErrors] = useState([]);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    // array to capture all the errors
    let errors = [];

    if (studentName === "" || studentName === null) {
      errors.push("Please enter your name");
    }
    if (institution === "" || institution === null) {
      errors.push("Please select or search a university name");
    }
    if (isTransfer === "") {
      errors.push("Please select whether you are transfer student or not");
    }
    if (gpa === "" || Number.isNaN(gpa)) {
      errors.push("Please enter your GPA");
    }
    if (readingWriting === "" || Number.isNaN(readingWriting)) {
      errors.push("Please enter your reading + writing SAT score");
    }
    if (math === "" || Number.isNaN(math)) {
      errors.push("Please enter your math SAT score");
    }

    // Set all the errors and show the toast
    if ((isTransfer === "" || isTransfer === "no") && errors.length !== 0) {
      setUniFinderAppErrors(errors);
      setShowError(true);
      return;
    }

    // There are no errors so show success toast
    setShowSuccess(true);
    fetchData();
  };

  // Fetch data from API
  const fetchData = () => {
    let request = {
      studentName: studentName,
      institutionId: parseInt(universitiesMap.get(institution)),
      studentTransferStatus: isTransfer === "yes" ? true : false,
      studentGpa: gpa,
      studentReadingWritingScore: readingWriting,
      studentMathScore: math,
    };
    axios
      .post("/user-details", JSON.stringify(request), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("successfully posted to the server!!");
        } else {
          console.log("it wasn't successful");
        }
      })
      .catch((err) => {
        console.log(err.response.request._response);
      });
    console.log(JSON.stringify(request));

    resetData();
  };

  // Reset all the states
  const resetData = () => {
    setStudentName("");
    setInstitution("");
    setIsTransfer("");
    setGpa("");
    setReadingWriting("");
    setMath("");
  };

  return (
    <div>
      <Container>
        <Form onSubmit={submitHandler} className="col-md-6 form">
          {/* ------- Toast Error section ------- */}
          <Toast
            bg={"danger"}
            onClose={() => setShowError(false)}
            show={showError}
            delay={3000}
            autohide
          >
            <Toast.Body className={"text-white w-auto"}>
              {uniFinderAppErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </Toast.Body>
          </Toast>
          {/* ------- Toast Success section ------- */}
          <Toast
            bg={"success"}
            onClose={() => setShowSuccess(false)}
            show={showSuccess}
            delay={2000}
            autohide
          >
            <Toast.Body className={"text-white w-auto"}>
              Form submitted successfully!
            </Toast.Body>
          </Toast>

          {/* ------- First name & last name section ------- */}
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Enter your name</Form.Label>
            <Form.Control
              placeholder="First and last name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </Form.Group>

          {/* ------- Autocomplete section ------- */}
          <Row className="mb-4" style={{ marginTop: "2em" }}>
            <Form.Group as={Col}>
              <Form.Label>Select your dream college</Form.Label>
              <Autocomplete
                options={universitiesList}
                value={institution}
                onChange={(_, v) => setInstitution(v)}
                renderInput={(params) => (
                  <TextField {...params} label="Select a university" />
                )}
                isOptionEqualToValue={(option, value) =>
                  value === undefined || value === "" || option.id === value.id
                }
              />
            </Form.Group>
          </Row>

          {/* ------- Transfer section ------- */}
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Are you transfer student?</Form.Label>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={isTransfer}
                onChange={(e) => setIsTransfer(e.target.value)}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Form.Group>
          </Row>

          {/* ------- GPA section ------- */}
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Label>What is your GPA?</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min={0.0}
                max={4.0}
                placeholder={"Enter your GPA"}
                value={gpa || ""}
                onChange={(e) => setGpa(e.target.valueAsNumber)}
              />
            </Form.Group>
          </Row>

          {/* ------- SAT section ------- */}
          <Row className="mb-2">
            <Form.Group as={Col}>
              <div className="sat-span">
                <span>
                  Note: submitting SAT scores are optional if you are transfer
                  student
                </span>
              </div>
              <Form.Label>What are your SAT scores?</Form.Label>
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Col xs lg="4">
              <Form.Label>Reading + writing</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="number"
                step="0.1"
                min={200.0}
                max={800.0}
                placeholder={"Enter reading + writing score"}
                value={readingWriting || ""}
                onChange={(e) => setReadingWriting(e.target.valueAsNumber)}
              />
            </Col>
          </Row>
          <Row>
            <Col xs lg="4">
              <Form.Label>Math</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="number"
                step="0.1"
                min={200.0}
                max={800.0}
                placeholder={"Enter math score"}
                value={math || ""}
                onChange={(e) => setMath(e.target.valueAsNumber)}
              />
            </Col>
          </Row>
          {/* ------- SAT section ends here ------- */}
          <Button className="form-btn" type="submit">
            see if you quality
          </Button>
        </Form>
      </Container>
    </div>
  );
}
