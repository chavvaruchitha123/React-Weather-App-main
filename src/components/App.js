import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainComponent from "./MainComponent";
import Navbar from "./navbar";
import FavoriteCities from "./Favouritecities";
// import FavoriteCities from "./Favoritecities"; // Make sure the path is correct

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const removeFromFavorites = (cityId) => {
    const updatedFavorites = favorites.filter((city) => city.id !== cityId);
    setFavorites(updatedFavorites);
  };

  return (
    <Router>
      <div className="outer">
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={<MainComponent setFavorites={setFavorites} />}
          />
          <Route
            path="/favorites"
            element={
              <FavoriteCities
                favorites={favorites}
                removeFromFavorites={removeFromFavorites}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

