

import {Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';




export default function SATForm() {
    const [readingWriting, setReadingWriting] = useState('');
    const [math, setMath] = useState('');

    
    
    return (
            <div>
            <Row className='mb-2'>
          <Form.Group as={Col}>
            <Form.Label>What are your SAT scores?</Form.Label>
          </Form.Group>
        </Row>
        <Row className='mb-2'>
          <Col xs lg='4'>
            <Form.Label>Reading + writing</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type='number'
              step='0.1'
              min={200.0}
              max={800.0}
              placeholder={'Enter reading + writing score'}
              value={readingWriting || ''}
              onChange={(e) => setReadingWriting(e.target.valueAsNumber)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs lg='4'>
            <Form.Label>Math</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type='number'
              step='0.1'
              min={200.0}
              max={800.0}
              placeholder={'Enter math score'}
              value={math || ''}
              onChange={(e) => setMath(e.target.valueAsNumber)}
            />
          </Col>
        </Row>
            </div>
    )
}
