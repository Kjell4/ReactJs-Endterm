import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ item }) {
  return (
    <div className="card">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>Status: {item.status}</p>
      <Link to={`/items/${item.id}`}>View Details</Link>
    </div>
  );
}
