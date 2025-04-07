import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GameCard from '../../components/GameCard/GameCard';
import './LibraryPage.css';

const LibraryPage = () => {
  const { savedGames } = useSelector((state) => state.library);
  
  return (
    <Container className="library-page">
      <div className="library-header">
        <h1>My Game Library</h1>
        <p>Your saved games collection</p>
      </div>
      
      {savedGames.length === 0 ? (
        <Card className="empty-library">
          <Card.Body>
            <Alert variant="info">
              <Alert.Heading>Your library is empty</Alert.Heading>
              <p>
                Browse games and add them to your library by clicking the "+" button on game cards.
              </p>
              <hr />
              <div className="d-flex justify-content-end">
                <Link to="/" className="btn btn-primary">
                  Browse Games
                </Link>
              </div>
            </Alert>
          </Card.Body>
        </Card>
      ) : (
        <>
          <p className="game-count">{savedGames.length} {savedGames.length === 1 ? 'game' : 'games'} in your library</p>
          <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
            {savedGames.map((game) => (
              <Col key={game.id}>
                <GameCard game={game} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default LibraryPage;