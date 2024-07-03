import { Button, Container, Row } from "react-bootstrap";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.HeroSection}>
      <Container>
        <Row className="align-items-center">
          <div className={`col-12 col-lg-6 ${styles.HeroText}`}>
            <h1 className="lead BoldText">Unleash Your Potential</h1>
            <h2>
              We'll help you reach your fitness goals in a supportive and
              motivating environment.
            </h2>
            <Button className="px-5 py-3 BoldText">Check Our Memberships</Button>
          </div>
          <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
            <img className={styles.HeroImg} src="Hero.webp" />
          </div>
        </Row>
      </Container>
    </div>
  );
}
