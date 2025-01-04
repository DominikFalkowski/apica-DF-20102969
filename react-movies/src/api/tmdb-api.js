console.log("API Key:", process.env.REACT_APP_TMDB_KEY); // Debug log

export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};
  
export const getMovie = async ({ queryKey }) => {
  const [, { id }] = queryKey;

  if (!id) {
    console.error("Invalid movie ID:", id);
    throw new Error("Invalid id: The pre-requisite id is invalid or not found.");
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  return response.json();
};


export const getMovieCredits = async ({ queryKey }) => {
  const [, { id }] = queryKey;

  if (!id) {
    console.error("Invalid movie ID:", id);
    throw new Error("Invalid id: The pre-requisite id is invalid or not found.");
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie credits");
  }
  return response.json();
};

  
export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      process.env.REACT_APP_TMDB_KEY +
      "&language=en-US"
  ).then( (response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getTrendingMovies = () => {
  return fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key="+
      process.env.REACT_APP_TMDB_KEY+
    "&language=en-US"
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching trending movies:", error);
      throw error;
    });
};
export const getUpcomingMovies = () => {
  return fetch(
    "https://api.themoviedb.org/3/movie/upcoming?api_key="+
    process.env.REACT_APP_TMDB_KEY+
  "&language=en-US&page=1"
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};
export const searchActor = (actorName) => {
  return fetch(
    "https://api.themoviedb.org/3/search/person?query=${actorName}&api_key="+
    process.env.REACT_APP_TMDB_KEY
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch actor details");
      }
      return response.json();
    })
    .then((data) => {
      if (data.results.length === 0) {
        throw new Error("No actor found with this name");
      }
      return data.results[0]; 
    });
};

export const getMoviesByActor = (actorId) => {
  return fetch(
    "https://api.themoviedb.org/3/discover/movie?with_cast=${actorId}&api_key="+
    process.env.REACT_APP_TMDB_KEY
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      return response.json();
    });
};


  
export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then( (response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};
  
export const getMovieReviews = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then( (response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};