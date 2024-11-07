import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AutoSuggestStories from "./components/AutoSuggestStories.tsx";
import FavoriteStories from "./components/FavoriteStories.tsx";
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
        <AutoSuggestStories/>
        <FavoriteStories />
    </div>
  )
}

export default App
