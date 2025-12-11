import { useSelector } from "react-redux";
import Card from "../components/Card";

export default function Favorites() {
  const { favorites } = useSelector((state) => state.favorites);

  return (
    <section style={{ textAlign: "center" }}>
      <h1>⭐ Favorite Characters</h1>

      <div className="something-list-cards">
        {favorites.length > 0 ? (
          favorites.map((item) => <Card key={item.id} item={item} />)
        ) : (
          <p>No favorites added yet</p>
        )}
      </div>
    </section>
  );
}
