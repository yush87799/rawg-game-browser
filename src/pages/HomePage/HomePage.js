import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar/Sidebar';
import GameGrid from '../../components/GameGrid/GameGrid';
import './HomePage.css';

const HomePage = () => {
  return (
    <Container fluid className="home-page">
      <Row>
        <Col xs={12} md={3} lg={2} className="sidebar-column">
          <Sidebar />
        </Col>
        <Col xs={12} md={9} lg={10} className="main-content-column">
          <GameGrid />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;