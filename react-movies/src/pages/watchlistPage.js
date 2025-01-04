import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import WriteReview from "../components/cardIcons/writeReview";
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";

const WatchlistMoviesPage = () => {
  const { watchlist: movieIds } = useContext(MoviesContext);

  const watchlistQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  const isLoading = watchlistQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = watchlistQueries
  .map((query) => {
    if (query.isError || !query.data || !query.data.id) return null;
    const movie = query.data;
    movie.genre_ids = movie.genres ? movie.genres.map((g) => g.id) : [];
    return movie;
  })
  .filter((movie) => movie !== null);

  const toDo = () => true;

  return (
    <PageTemplate
      title="My Watchlist"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromWatchlist movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default WatchlistMoviesPage;