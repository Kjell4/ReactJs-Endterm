import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchItemById, clearSelected } from "../features/items/itemsSlice";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import "./SomethingDetails.css";

export default function SomethingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedItem,
    loadingItem,
    errorItem,
  } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchItemById(id));

    return () => dispatch(clearSelected());
  }, [id, dispatch]);

  if (loadingItem) return <Spinner />;
  if (errorItem) return <ErrorBox message={errorItem} />;
  if (!selectedItem) return <ErrorBox message="Character not found" />;

  const item = selectedItem;

  return (
    <section className="details-section">
      <button className="details-back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <h1 className="details-title">{item.name}</h1>

      <img
        src={item.image}
        alt={item.name}
        className="details-image"
      />

      <div className="details-info">
        <p><b>Status:</b> {item.status}</p>
        <p><b>Species:</b> {item.species}</p>
        <p><b>Gender:</b> {item.gender}</p>
        <p><b>Origin:</b> {item.origin.name}</p>
        <p><b>Location:</b> {item.location.name}</p>
        <p><b>Episode Count:</b> {item.episode.length}</p>
      </div>
    </section>
  );
}