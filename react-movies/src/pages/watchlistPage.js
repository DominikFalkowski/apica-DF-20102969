import React, {useState,useContext, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import WriteReview from "../components/cardIcons/writeReview";
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";

const WatchlistMoviesPage = () => {
  const { watchlist: movieIds } = useContext(MoviesContext);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/watchlist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch watchlist.");
        }

        const data = await response.json();
        movieIds(data.movies || []);
      } catch (error) {
        console.error("Error fetching watchlist:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);
  const removeFromWatchlist = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/watchlist/${movieId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove movie from watchlist.");
      }

      movieIds((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
    } catch (error) {
      console.error("Error removing from watchlist:", error.message);
    }
  };

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
            <RemoveFromWatchlist movie={movie} onRemove={() => removeFromWatchlist(movie.id)} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default WatchlistMoviesPage;