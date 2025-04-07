import React, { useState, useEffect } from 'react';
import { Container, Navbar, Form, InputGroup, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { setSearchQuery } from '../../redux/slices/gamesSlice';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { searchQuery } = useSelector((state) => state.games);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(localSearchQuery));
    navigate('/');
  };

  const handleInputChange = (e) => {
    setLocalSearchQuery(e.target.value);
    const timeoutId = setTimeout(() => {
      dispatch(setSearchQuery(e.target.value));
    }, 500);
    
    return () => clearTimeout(timeoutId);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header main-content">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="logo">
          RAWG Game Browser
        </Navbar.Brand>
        
        <Form className="search-form d-flex" onSubmit={handleSearch}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search games..."
              value={localSearchQuery}
              onChange={handleInputChange}
              className="search-input"
            />
            <Button type="submit" variant="primary">
              Search
            </Button>
          </InputGroup>
        </Form>
        
        <div className="auth-section">
          {isSignedIn ? (
            <>
              <Button as={Link} to="/library" variant="outline-light" className="me-3">
                My Library
              </Button>
              <UserButton />
            </>
          ) : (
            <SignInButton mode="modal">
              <Button variant="outline-light">Sign In</Button>
            </SignInButton>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
