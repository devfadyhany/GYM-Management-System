import { Button, Container, Row } from "react-bootstrap";
import styles from "./page.module.css";
import FeatureCard from "../_components/FeatureCard";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className={styles.HeroSection}>
      <Container>
        <Row className="align-items-center">
          <div className={`col-12 col-lg-6 ${styles.HeroText}`}>
            <h1 className="lead BoldText">Unleash Your Potential</h1>
            <h2>
              We'll help you reach your fitness goals in a supportive and
              motivating environment.
            </h2>
            <Link href="/memberships" className="btn px-5 py-3 BoldText text-white">Check Our Memberships</Link>
          </div>
          <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
            <img className={styles.HeroImg} src="Hero.webp" />
          </div>
        </Row>
      </Container>
    </div>
    
    <h1 className="lead BoldText text-center mt-3">Features</h1>
    <Container className="py-5">
      <Row className="gap-5 justify-content-center ">
        <FeatureCard icon="secureFeature.svg" title="Secured" description="Your Information is Secured On Our Platform."/>
        <FeatureCard icon="chatFeature.svg" title="Coach Chat" description="Easily Chat With Your Coach For Any Further Questions."/>
        <FeatureCard icon="organizeFeature.svg" title="Workout Schedule" description="Organize Your Workout Schedule To Easily Remember."/>
      </Row>
    </Container>
    </>
  );
}
