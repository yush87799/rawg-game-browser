import React, { useEffect } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../../redux/slices/gamesSlice';
import GameCard from '../GameCard/GameCard';
import Pagination from '../Pagination/Pagination';
import './GameGrid.css';

const GameGrid = () => {
  const dispatch = useDispatch();
  const { 
    games, 
    status, 
    error, 
    searchQuery, 
    filters,
    currentPage,
    count 
  } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchGames({ page: currentPage, searchQuery, filters }));
  }, [dispatch, currentPage, searchQuery, filters]);

  if (status === 'loading' && games.length === 0) {
    return (
      <div className="loading-container">
        <Spinner animation="border" role="status" variant="light">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (status === 'failed') {
    return (
      <Alert variant="danger" className="m-3">
        Error: {error}
      </Alert>
    );
  }
  if (games.length === 0 && status === 'succeeded') {
    return (
      <div className="no-results">
        <h3>No games found</h3>
        <p>Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="game-grid-container">
      <div className="results-info">
        {searchQuery && <h4>Search results for: "{searchQuery}"</h4>}
        <p>Showing {games.length} of {count} games</p>
      </div>

      <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
        {games.map((game) => (
          <Col key={game.id}>
            <GameCard game={game} />
          </Col>
        ))}
      </Row>

      <Pagination 
        currentPage={currentPage}
        totalPages={Math.ceil(count / 12)}
      />
    </div>
  );
};

export default GameGrid;