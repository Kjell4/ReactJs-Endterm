import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ item }) {
  const dispatch = useDispatch();
  const { favorites } = useSelector(state => state.favorites);

  const isFav = favorites.some(f => f.id === item.id);

  return (
    <div className="card">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>Status: {item.status}</p>

      <Link to={`/items/${item.id}`}>View Details</Link>

      <button
        className="fav-btn"
        onClick={() => dispatch(toggleFavorite(item))}
      >
        {isFav ? "★ Remove Favorite" : "☆ Add to Favorite"}
      </button>
    </div>
  );
}
