import React, { useState, createContext, useContext } from "react";

export const MoviesContext = createContext(null);

export const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]); 
  const [myReviews, setMyReviews] = useState({});

  const addToFavorites = (movie) => {
    if (!favorites.includes(movie.id)) {
      setFavorites([...favorites, movie.id]);
    }
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((mId) => mId !== movie.id));
  };

  const addToWatchlist = (movie) => {
    if (!watchlist.includes(movie.id)) {
      setWatchlist([...watchlist, movie.id]);
    }
  };

  const removeFromWatchlist = (movie) => {
    setWatchlist(watchlist.filter((mId) => mId !== movie.id));
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  const isFavorite = (movieId) => favorites.includes(movieId);
  const isInWatchlist = (movieId) => watchlist.includes(movieId);

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        watchlist,
        myReviews,
        addToFavorites,
        removeFromFavorites,
        addToWatchlist,
        removeFromWatchlist,
        addReview,
        isFavorite,
        isInWatchlist,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => useContext(MoviesContext);

export default MoviesContextProvider;