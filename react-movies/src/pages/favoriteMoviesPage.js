import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';

const FavoriteMoviesPage = () => {
  const { favorites: movieIds } = useContext(MoviesContext);

 
  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
    }))
  );

 
  const isLoading = favoriteMovieQueries.some((query) => query.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries
    .map((query) => {
      if (query.isError || !query.data) return null; 
      const movie = query.data;
      movie.genre_ids = movie.genres ? movie.genres.map((g) => g.id) : []; 
      return movie;
    })
    .filter((movie) => movie !== null);
    console.log("Favorite Movies Data:", favoriteMovieQueries);


  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => {
        return <></>; 
      }}
    />
  );
};

export default FavoriteMoviesPage;
