import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AutoSuggestStories from "./components/AutoSuggestStories.tsx";
import FavoriteStories from "./components/FavoriteStories.tsx";
import { loadFavorites } from "./store/favoriteStories";
import "./App.css";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadFavorites());
    }, [dispatch]);

  return (
    <div>
      <AutoSuggestStories />
      <FavoriteStories />
    </div>
  )
}

export default App
