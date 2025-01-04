import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getTrendingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";


const TrendingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery(
    "trendingMovies",
    getTrendingMovies
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>Error: {error.message}</h1>;
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Trending Movies"
      movies={movies}
    />
  );
};

export default TrendingMoviesPage;
