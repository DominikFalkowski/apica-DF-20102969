import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../contexts/moviesContext";
import img from '../../images/film-poster-placeholder.png';
import AddToWatchlistIcon from "../cardIcons/addToWatchlist";
import RemoveFromWatchlistIcon from "../cardIcons/removeFromWatchlist";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";

const MovieCard = ({ movie }) => {
  console.log("MovieCard Rendered: ", movie);
  const { favorites, watchlist } = useContext(MoviesContext);
  const isFavorite = favorites.includes(movie.id);
  const isInWatchlist = watchlist.includes(movie.id);

  console.log("MovieCard Rendered: ", movie);


  return (
    <Card>
      <CardHeader
        avatar={
          isFavorite && ( 
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          )
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
        title={movie.title}
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" /> {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" /> {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {/* Add or Remove from Watchlist Icon */}
        {isInWatchlist ? (
          <RemoveFromWatchlistIcon movie={movie} />
        ) : (
          <AddToWatchlistIcon movie={movie} />
        )}
        {/* Add to Favorites Icon */}
        <AddToFavoritesIcon movie={movie} />
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
