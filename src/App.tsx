import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SearchStories from "./components/sections/search-stories/SearchStories.tsx";
import FavoriteStories from "./components/sections/favorite-stories/FavoriteStories.tsx";
import { loadFavorites } from "./store/favoriteStories";
import logo from "./assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS globally
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS globally

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadFavorites());
    }, [dispatch]);

  return (
    <div className="app-container">
        <img src={logo} className="app-logo" alt="logo"/>
        <div className="container search-page">
            <SearchStories />
            <FavoriteStories />
        </div>
    </div>
  )
}

export default App
