import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import "./styles.css";

const Home = () => {
  return (
    <Container className="section_padding mt-4">
      {/* Sección de Inicio */}
      <Row>
        <Col sm={6}>
          <h1 className="title">
            Bienvenido a <span className="tea">TEA</span>
            <span className="yudo">yudo</span>, podes involucrarte.
          </h1>
          <p className="hero-text">
            Unite a nosotros para empezar a transformar vidas de niños con
            Trastornos en el Espectro Autista
          </p>
          <a href="/registro" className="button">
            Unite
          </a>
        </Col>

        <Col sm={6}>
          <div className="hero-img-container">
            <img src="niño.png" className="img-fluid hero-img" alt="Niño" />
          </div>
        </Col>
      </Row>

      {/* Sección de FAQ */}
      <Row className="section_padding">
        <Col>
          <h2 className="section_title">Preguntas Frecuentes</h2>
          <Accordion defaultActiveKey="0" className="custom-accordion">
            <Accordion.Item eventKey="0">
              <Accordion.Header className="accordion-header">
                ¿Qué servicios ofrece TEAyudo para niños con TEA?
              </Accordion.Header>
              <Accordion.Body className="accordion-body">
                TEAyudo ofrece una variedad de servicios diseñados para apoyar y
                mejorar la calidad de vida de los niños con Trastorno del
                Espectro Autista. Esto incluye programas educativos
                personalizados, sesiones de terapia conductual, y actividades de
                integración social. Trabajamos de cerca con las familias para
                crear un entorno de apoyo que promueva el desarrollo y el
                bienestar de los niños.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header className="accordion-header">
                ¿Cómo puedo contribuir como voluntario/a para TEAyudo?
              </Accordion.Header>
              <Accordion.Body className="accordion-body">
                Nos emociona que estés interesado/a en ser parte de TEA yudo.
                Puedes contribuir como voluntario/a completando nuestro
                formulario en la sección de "Unite" en la página principal. Una
                vez que recibamos tu solicitud, nos pondremos en contacto
                contigo para discutir las oportunidades de voluntariado
                disponibles y cómo puedes aportar tus habilidades y tiempo para
                ayudar a los niños con TEA.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header className="accordion-header">
                ¿Cómo puedo donar para apoyar la causa de TEAyudo?
              </Accordion.Header>
              <Accordion.Body className="accordion-body">
                Agradecemos tu interés en apoyar nuestra causa. Puedes realizar
                donaciones de manera segura a través de nuestra página de
                donaciones en línea. Las contribuciones financian directamente
                programas educativos, terapias, y actividades para niños con
                TEA. Cada donación, independientemente de su tamaño, hace una
                diferencia significativa en la vida de estos niños y sus
                familias. ¡Tu generosidad es fundamental para nuestro compromiso
                con la inclusión y el apoyo continuo!
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      {/* Sección de Servicios */}
      <Row className="section_padding">
        <Col>
          <h2 className="section_title">Nuestros Servicios</h2>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Programa Educativo</Card.Title>
                  <Card.Text>
                    TEAyudo ofrece un programa educativo personalizado para
                    niños con Trastorno del Espectro Autista. Nuestro enfoque se
                    centra en el desarrollo integral, proporcionando actividades
                    educativas adaptadas a las necesidades individuales de cada
                    niño. ¡Descubre cómo podemos apoyar el crecimiento y
                    aprendizaje de tu hijo!
                  </Card.Text>
                  <Card.Link href="#">Detalles</Card.Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Terapia Conductual</Card.Title>
                  <Card.Text>
                    Nuestro servicio de terapia conductual está diseñado para
                    ayudar a los niños con TEA a desarrollar habilidades
                    sociales, comunicativas y de comportamiento. Nuestros
                    terapeutas altamente capacitados trabajan en colaboración
                    con las familias para crear un plan personalizado que se
                    adapte a las necesidades únicas de cada niño.
                  </Card.Text>
                  <Card.Link href="#">Detalles</Card.Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body className="card">
                  <Card.Title>Actividades Recreativas</Card.Title>
                  <Card.Text>
                    Nuestra iniciativa de integración social ofrece a los niños
                    con TEA la oportunidad de participar en actividades
                    recreativas y sociales. Fomentamos la inclusión y la
                    conexión entre los niños, creando un ambiente amigable y
                    comprensivo. ¡Descubre cómo contribuimos al desarrollo
                    emocional y social de tu hijo!
                  </Card.Text>
                  <Card.Link href="#">Detalles</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
