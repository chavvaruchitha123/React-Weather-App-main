import React from "react";

const FavoriteCities = ({ favorites, removeFromFavorites }) => {
  const handleRemove = (cityId) => {
    removeFromFavorites(cityId);
  };

  return (
    <div className="favorites">
      <h2>Favorite Cities</h2>
      <ul>
        {favorites.map((city) => (
          <li key={city.id}>
            {city.name} - {city.weather[0].main}
            <span></span>
            <button onClick={() => handleRemove(city.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteCities;
