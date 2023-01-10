
import {Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

function GpaForm() {
  const [gpa, setGpa] = useState('');

  return (


        <Row className='mb-4'>
            <Form.Group as={Col}>
              <Form.Label>What is your GPA?</Form.Label>
              <Form.Control
                type='number'
                step='0.1'
                min={0.0}
                max={4.0}
                placeholder={'Enter your GPA'}
                value={gpa || ''}
                onChange={(e) => setGpa(e.target.valueAsNumber)}
              />
            </Form.Group>
          </Row>


  

  )



        
        
}


export default GpaForm;