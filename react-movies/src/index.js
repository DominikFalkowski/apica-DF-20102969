import React from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DarkModeProvider } from "./contexts/themeContext";
import WatchlistPage from "./pages/watchlistPage";
import TrendingMoviesPage from "./pages/trendingMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import ProtectedRoutes from "./protectedRoutes.js";




const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
        <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
          <Route path="/reviews/:id" element={<MovieReviewPage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/reviews/form" element={<AddMovieReviewPage />} />
          <Route path="/movies/watchlist" element={<WatchlistPage />} />
          <Route path="/movies/trending" element={<TrendingMoviesPage />} />
          <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
);
