export const getWatchlist = async (token) => {
    const response = await fetch("http://localhost:8080/api/watchlist", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await response.json();
  };
  
  export const addToWatchlist = async (movieId, token) => {
    const response = await fetch(`http://localhost:8080/api/watchlist/${movieId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await response.json();
  };
  
  export const removeFromWatchlist = async (movieId, token) => {
    const response = await fetch(`http://localhost:8080/api/watchlist/${movieId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await response.json();
  };
  