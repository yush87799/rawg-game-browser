import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, useUser } from '@clerk/clerk-react';
import { store } from './redux/store';
import HomePage from './pages/HomePage/HomePage';
import GameDetailPage from './pages/GameDetailPage/GameDetailPage';
import LibraryPage from './pages/LibraryPage/LibraryPage';
import Header from './components/Header/Header';
import { addToLibrary } from './redux/slices/librarySlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const SyncBookmarks = () => {
  const { user } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndSyncBookmarks = async () => {
      if (user?.publicMetadata?.bookmarks?.length > 0) {
        const bookmarks = user.publicMetadata.bookmarks;
        bookmarks.forEach(game => dispatch(addToLibrary(game)));
      }
    };

    fetchAndSyncBookmarks();
  }, [user, dispatch]);

  return null;
};

const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Provider store={store}>
        <Router>
          <div className="app-container">
            <Header />
            <SyncBookmarks />
            <div className="content-wrapper">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game/:id" element={<GameDetailPage />} />
                <Route 
                  path="/library" 
                  element={
                    <ProtectedRoute>
                      <LibraryPage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
          </div>
        </Router>
      </Provider>
    </ClerkProvider>
  );
}

export default App;
