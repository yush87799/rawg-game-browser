import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToLibrary, removeFromLibrary } from '../../redux/slices/librarySlice';
import './GameCard.css';
import { useUser } from '@clerk/clerk-react';
import { updateUserBookmarks } from '../../utils/clerkHelpers';


const GameCard = ({ game }) => {
  const dispatch = useDispatch();
  const savedGames = useSelector((state) => state.library.savedGames);
  const isInLibrary = savedGames.some((savedGame) => savedGame.id === game.id);
  const { user } = useUser();

  const handleToggleLibrary = (e) => {
    e.preventDefault();
    e.stopPropagation();

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

  
  const formatReleaseDate = (dateString) => {
    if (!dateString) return 'Release date unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  return (
    <Card className="game-card">
      <Link to={`/game/${game.id}`} className="game-card-link">
        <div className="image-container">
          <Card.Img 
            variant="top" 
            src={game.background_image || 'https://via.placeholder.com/300x150?text=No+Image'} 
            alt={game.name}
            className="game-image"
          />
          <div className="rating-badge">
            <span className="rating-value">{game.rating ? game.rating.toFixed(1) : 'N/A'}</span>
            <div className="star-icon">★</div>
          </div>
          <button 
            className={`library-button ${isInLibrary ? 'in-library' : ''}`} 
            onClick={handleToggleLibrary}
          >
            {isInLibrary ? '✓' : '+'}
          </button>
        </div>
        
        <Card.Body>
          <Card.Title className="game-title">{game.name}</Card.Title>
          <div className="game-meta">
            <span className="release-date">{formatReleaseDate(game.released)}</span>
          </div>
          
          <div className="platforms">
            {game.parent_platforms?.map(({ platform }) => (
              <span key={platform.id} className="platform-icon" title={platform.name} >
                {getPlatformIcon(platform.name)}
              </span>
            ))}
          </div>
          
          <div className="game-tags">
            {game.genres?.slice(0, 3).map((genre) => (
              <Badge key={genre.id} bg="secondary" className="genre-badge">
                {genre.name}
              </Badge>
            ))}
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

const getPlatformIcon = (platformName) => {
  switch (platformName.toLowerCase()) {
    case 'pc':
      return '🖥️';
    case 'playstation':
      return '🎮';
    case 'xbox':
      return '🎯';
    case 'nintendo':
      return '🕹️';
    case 'ios':
      return '📱';
    case 'android':
      return '📱';
    case 'mac':
      return '💻';
    case 'linux':
      return '🐧';
    default:
      return '🎮';
  }
};

export default GameCard;