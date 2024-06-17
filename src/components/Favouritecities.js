import React from "react";

function FavoriteCities({ favoriteCities, removeFavoriteCity }) {
  return (
    <div className="favorite-cities">
      <h2>Favorite Cities</h2>
      {favoriteCities.length === 0 ? (
        <p>No favorite cities added yet.</p>
      ) : (
        <ul>
          {favoriteCities.map(city => (
            <li key={city.name}>
              {city.name} ({city.country})
              <button onClick={() => removeFavoriteCity(city)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default FavoriteCities;

