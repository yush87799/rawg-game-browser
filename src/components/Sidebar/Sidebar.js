import React, { useState, useEffect } from 'react';
import { Form, Button, Accordion } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/slices/gamesSlice';
import api from '../../services/api';
import './Sidebar.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const currentFilters = useSelector((state) => state.games.filters);

  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false); 

  const [localFilters, setLocalFilters] = useState({
    genres: '',
    tags: '',
    platforms: '',
    ordering: '',
    dates: '',
  });

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [genresData, tagsData, platformsData] = await Promise.all([
          api.getGenres(),
          api.getTags(),
          api.getPlatforms()
        ]);
        setGenres(genresData);
        setTags(tagsData.slice(0, 20));
        setPlatforms(platformsData);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    setLocalFilters({
      genres: currentFilters.genres || '',
      tags: currentFilters.tags || '',
      platforms: currentFilters.platforms || '',
      ordering: currentFilters.ordering || '',
      dates: currentFilters.dates || '',
    });
  }, [currentFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };

  const handleApplyFilters = () => {
    dispatch(setFilters(localFilters));
    setShowMobileFilters(false);
  };

  const handleResetFilters = () => {
    const reset = {
      genres: '',
      tags: '',
      platforms: '',
      ordering: '',
      dates: '',
    };
    setLocalFilters(reset);
    dispatch(setFilters(reset));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h4>Filters</h4>
        <Button
          variant="outline-light"
          size="sm"
          className="d-md-none"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
        <Button
          variant="outline-light"
          size="sm"
          className="d-none d-md-inline"
          onClick={handleResetFilters}
        >
          Reset All
        </Button>
      </div>

      {(showMobileFilters || window.innerWidth >= 768) && (
        <>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Genres</Accordion.Header>
          <Accordion.Body>
            <Form.Select 
              name="genres"
              value={localFilters.genres}
              onChange={handleFilterChange}
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>
        
        <Accordion.Item eventKey="1">
          <Accordion.Header>Platforms</Accordion.Header>
          <Accordion.Body>
            <Form.Select 
              name="platforms"
              value={localFilters.platforms}
              onChange={handleFilterChange}
            >
              <option value="">All Platforms</option>
              {platforms.map((platform) => (
                <option key={platform.id} value={platform.id}>
                  {platform.name}
                </option>
              ))}
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>
        
        <Accordion.Item eventKey="2">
          <Accordion.Header>Tags</Accordion.Header>
          <Accordion.Body>
            <Form.Select 
              name="tags"
              value={localFilters.tags}
              onChange={handleFilterChange}
            >
              <option value="">All Tags</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>
        
        <Accordion.Item eventKey="3">
          <Accordion.Header>Release Year</Accordion.Header>
          <Accordion.Body>
            <Form.Select 
              name="dates"
              value={localFilters.dates}
              onChange={handleFilterChange}
            >
              <option value="">All Time</option>
              <option value="2023-01-01,2023-12-31">2023</option>
              <option value="2022-01-01,2022-12-31">2022</option>
              <option value="2021-01-01,2021-12-31">2021</option>
              <option value="2020-01-01,2020-12-31">2020</option>
              <option value="2019-01-01,2019-12-31">2019</option>
              <option value="2015-01-01,2018-12-31">2015-2018</option>
              <option value="2010-01-01,2014-12-31">2010-2014</option>
              <option value="2000-01-01,2009-12-31">2000-2009</option>
              <option value="1990-01-01,1999-12-31">1990-1999</option>
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>
        
        <Accordion.Item eventKey="4">
          <Accordion.Header>Sort By</Accordion.Header>
          <Accordion.Body>
            <Form.Select 
              name="ordering"
              value={localFilters.ordering}
              onChange={handleFilterChange}
            >
              <option value="-rating">Rating (High to Low)</option>
              <option value="rating">Rating (Low to High)</option>
              <option value="-released">Release Date (Newest)</option>
              <option value="released">Release Date (Oldest)</option>
              <option value="-added">Popularity</option>
              <option value="name">Name (A-Z)</option>
              <option value="-name">Name (Z-A)</option>
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>
          </Accordion>

          <Button
            variant="primary"
            className="w-100 mt-3"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
