import React, { useState } from "react";
import { TextField, Autocomplete } from '@mui/material';
import { Container, Form, FormLabel } from "react-bootstrap";
import "./styles.css";
import Hero from "./hero";
import universitiesMap from "./universities";

let universitiesList = [...universitiesMap.keys()];

export default function App() {
  const [inputValue, setInputValue] = useState('');

  const submitHandler = e => {
    e.preventDefault()
  }

  return (
    <div>
      <Hero />
      <Container>
        <Form onSubmit={submitHandler} className="col-md-6">
          <FormLabel style={{marginBottom:'1.5em'}}>Select your dream college</FormLabel>
          <Autocomplete
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={universitiesList}
            renderInput={(params) => <TextField {...params} label="Select a university" />}
          />
        </Form>
        <div style={{marginTop:'2em'}}>{`inputValue: '${inputValue}'`}</div>
      </Container>
    </div>

  );
}
