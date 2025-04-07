import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGameDetails, clearGameDetail } from '../../redux/slices/gamesSlice';
import GameDetail from '../../components/GameDetail/GameDetail';
import './GameDetailPage.css';

const GameDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { game, status } = useSelector((state) => state.games);
  
  useEffect(() => {
    dispatch(fetchGameDetails(id));
    
    return () => {
      dispatch(clearGameDetail());
    };
  }, [dispatch, id]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <Container fluid className="detail-page-container">
      <Button 
        variant="outline-light" 
        className="back-button"
        onClick={handleGoBack}
      >
        ← Back
      </Button>
      <GameDetail 
        game={game}
        loading={status === 'loading'}
      />
    </Container>
  );
};

export default GameDetailPage;