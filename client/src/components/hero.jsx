import { Button } from "react-bootstrap";
import "./styles.css";

export default function Hero() {
    return (
        <div className="cta">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <h1>
                            Find the best college the fits you and your learning style
                        </h1>
                        <p>Take control of your education right now!</p>
                        <Button className="cta-button">Take Action now</Button>
                    </div>
                </div>
            </div>
            <div className="edu-logo float-right">
                <img src="https://iftin-academy.s3.amazonaws.com/us_department_of_education.png" alt="us-department-of-education"/>
            </div>
        </div>
    );
}