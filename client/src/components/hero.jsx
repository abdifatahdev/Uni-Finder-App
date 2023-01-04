import { Container, Row } from 'react-bootstrap';
import './styles.css';

export default function Hero() {
  return (
    <div className='cta'>
      <Container>
        <Row className='col-lg-8'>
          <h1>Find the best college the fits you and your learning style</h1>
          <p>Take control of your education right now!</p>
        </Row>
      </Container>
      <div className='edu-logo float-right'>
        <img
          src='https://university-finder.s3.amazonaws.com/us_department_of_education.png'
          alt='us-department-of-education'
        />
      </div>
    </div>
  );
}
