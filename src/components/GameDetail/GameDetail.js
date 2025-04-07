import React from 'react';
import { Container, Row, Col, Badge, Card, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToLibrary, removeFromLibrary } from '../../redux/slices/librarySlice';
import './GameDetail.css';
import { useUser } from '@clerk/clerk-react';
import { updateUserBookmarks } from '../../utils/clerkHelpers'; // adjust path if needed


const GameDetail = ({ game, loading }) => {
  const { user } = useUser(); // ✅ Move this here — above any return
  const dispatch = useDispatch();
  const savedGames = useSelector((state) => state.library.savedGames);
  const isInLibrary = savedGames.some((savedGame) => savedGame.id === game?.id);

  if (loading) {
    return (
      <div className="game-detail-loading">
        <Spinner animation="border" variant="light" />
        <p>Loading game details...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="game-detail-error">
        <h3>Game not found</h3>
        <p>Sorry, we couldn't find the game you're looking for.</p>
      </div>
    );
  }

const handleToggleLibrary = () => {
  let updatedList;

  if (isInLibrary) {
    updatedList = savedGames.filter((savedGame) => savedGame.id !== game.id);
    dispatch(removeFromLibrary(game.id));
  } else {
    updatedList = [...savedGames, game];
    dispatch(addToLibrary(game));
  }

  if (user) {
    updateUserBookmarks(user, updatedList);
  }
};

  
  // Format release date
  const formatReleaseDate = (dateString) => {
    if (!dateString) return 'Release date unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  return (
    <Container className="game-detail">
      <div className="game-detail-header">
        <div className="game-header-content">
          <h1>{game.name}</h1>
          <div className="game-meta-info">
            <div className="rating">
              <span className="rating-label">Rating:</span>
              <span className="rating-value">{game.rating ? game.rating.toFixed(1) : 'N/A'}</span>
              <span className="rating-star">★</span>
            </div>
            <div className="release-date">
              <span className="release-label">Released:</span>
              <span>{formatReleaseDate(game.released)}</span>
            </div>
          </div>
          <div className="platforms-list">
            {game.parent_platforms?.map(({ platform }) => (
              <Badge key={platform.id} bg="dark" className="platform-badge">
                {platform.name}
              </Badge>
            ))}
          </div>
          <div className="genres-list">
            {game.genres?.map((genre) => (
              <Badge key={genre.id} bg="secondary" className="genre-badge">
                {genre.name}
              </Badge>
            ))}
          </div>
          <Button 
            variant={isInLibrary ? "success" : "primary"} 
            className="library-toggle-btn"
            onClick={handleToggleLibrary}
          >
            {isInLibrary ? 'Remove from Library' : 'Add to Library'}
          </Button>
        </div>
        <div 
          className="game-header-backdrop"
          style={{ backgroundImage: `url(${game.background_image})` }}
        ></div>
      </div>
      
      <Row className="game-content">
        <Col md={8}>
          <section className="game-description">
            <h3>About</h3>
            <div dangerouslySetInnerHTML={{ __html: game.description }}></div>
          </section>
          
          {game.screenshots && game.screenshots.length > 0 && (
            <section className="game-screenshots">
              <h3>Screenshots</h3>
              <div className="screenshots-grid">
                {game.screenshots.map((screenshot) => (
                  <div key={screenshot.id} className="screenshot-item">
                    <img 
                      src={screenshot.image} 
                      alt={`${game.name} screenshot`} 
                      className="screenshot-image"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </Col>
        
        <Col md={4}>
          <Card className="info-card">
            <Card.Header>
              <h4>Game Info</h4>
            </Card.Header>
            <Card.Body>
              <div className="info-item">
                <span className="info-label">Developer:</span>
                <span className="info-value">
                  {game.developers?.map(dev => dev.name).join(', ') || 'Unknown'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Publisher:</span>
                <span className="info-value">
                  {game.publishers?.map(pub => pub.name).join(', ') || 'Unknown'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Website:</span>
                <span className="info-value">
                  {game.website ? (
                    <a href={game.website} target="_blank" rel="noopener noreferrer">
                      Visit Official Website
                    </a>
                  ) : 'Not available'}
                </span>
              </div>
              {game.metacritic && (
                <div className="info-item">
                  <span className="info-label">Metacritic:</span>
                  <span className={`metacritic-score score-${getScoreClass(game.metacritic)}`}>
                    {game.metacritic}
                  </span>
                </div>
              )}
              <div className="info-item">
                <span className="info-label">Age Rating:</span>
                <span className="info-value">
                  {game.esrb_rating?.name || 'Not rated'}
                </span>
              </div>
            </Card.Body>
          </Card>
          
          {game.platforms && (
            <Card className="info-card mt-4">
              <Card.Header>
                <h4>System Requirements</h4>
              </Card.Header>
              <Card.Body>
                {game.platforms.some(p => p.platform.name === 'PC') ? (
                  game.platforms
                    .filter(p => p.platform.name === 'PC' && p.requirements)
                    .map((p, index) => (
                      <div key={index} className="system-req">
                        {p.requirements.minimum && (
                          <div className="req-section">
                            <h5>Minimum:</h5>
                            <div className="req-content">
                              {p.requirements.minimum}
                            </div>
                          </div>
                        )}
                        {p.requirements.recommended && (
                          <div className="req-section">
                            <h5>Recommended:</h5>
                            <div className="req-content">
                              {p.requirements.recommended}
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                ) : (
                  <p>System requirements not available for PC</p>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

const getScoreClass = (score) => {
  if (score >= 75) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
};

export default GameDetail;