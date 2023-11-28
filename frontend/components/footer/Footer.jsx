import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './styles.css'

const Footer = () => {
  return (
    <footer className="mt-5">
      <div className="footer">
        <Container>
          <Row>
            <Col className='text-center'>
              <p>&copy; <span>2023 TEAyudo</span>. Todos los derechos reservados.</p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
