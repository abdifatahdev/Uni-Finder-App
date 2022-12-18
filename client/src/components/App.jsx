import React, { useState } from "react";
import { Container, Form, Button} from "react-bootstrap";
// Form, Button, Col, Row, Spinner
import axios from "axios"
import './styles.css';

function App() {

    const [institutionId, setInstitutionId] = useState("")

    const submitHandler = (e) => {
        e.preventDefault();
        let userData = {
            institutionId: institutionId
        };
        const APIKey = "weIg6spfiKIk0fC3wg5omar71jNfWG44FbgK5ghN";
        axios
            .get(`https://api.data.gov/ed/collegescorecard/v1/schools.json?id=${institutionId}&fields=school.name,2020.student.size&api_key=${APIKey}`, JSON.stringify(userData), {
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
                console.error(`Error: ${err}`);
            });
        console.log(JSON.stringify(userData));
        // setInstitutionId("");
    };

    return (
        <Container>
        <div className="App">
            <h1>University Finder App</h1>
        </div>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Type University Name</Form.Label>
                    <Form.Control type="text" value={institutionId}
                                  onChange={(e) => setInstitutionId(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default App;