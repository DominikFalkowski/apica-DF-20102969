export const getWatchlist = async (ilikecake) => {
    const response = await fetch("http://localhost:8080/api/watchlist", {
      headers: { Authorization: `Bearer ${ilikecake}` },
    });
    return await response.json();
  };
  
  export const addToWatchlist = async (movieId, ilikecake) => {
    const response = await fetch(`http://localhost:8080/api/watchlist/${movieId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${ilikecake}` },
    });
    return await response.json();
  };
  
  export const removeFromWatchlist = async (movieId, ilikecake) => {
    const response = await fetch(`http://localhost:8080/api/watchlist/${movieId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${ilikecake}` },
    });
    return await response.json();
  };
  