import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ item }) {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);

  const isFav = favorites.some((f) => f.id === item.id);

  return (
    <div className="card">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>Status: {item.status}</p>

      <Link to={`/items/${item.id}`} className="details-btn">
        View Details
      </Link>

      <button
        className={`fav-btn ${isFav ? "active" : ""}`}
        onClick={() => dispatch(toggleFavorite(item))}
      >
        {isFav ? "★ In Favorites" : "☆ Add to Favorites"}
      </button>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 050baeacb83dc6bf839195b1372424d2f8a92a41
