import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import LoginPage from "./pages/loginPage"; 
import SignUpPage from "./pages/signUpPage"; 
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import WatchlistPage from "./pages/watchlistPage";
import TrendingMoviesPage from "./pages/trendingMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";

import ProtectedRoutes from "./protectedRoutes.js";
import { AuthProvider } from "./contexts/authContext"; 
import MoviesContextProvider from "./contexts/moviesContext"; 
import { DarkModeProvider } from "./contexts/themeContext"; 
import SiteHeader from "./components/siteHeader/index.js";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <DarkModeProvider>
            <SiteHeader />
            <MoviesContextProvider>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="/" element={<HomePage />} />
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
          </DarkModeProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
};


// Render the app
const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
