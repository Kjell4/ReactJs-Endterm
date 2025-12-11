import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, setQuery } from "../features/items/itemsSlice";

import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import Card from "../components/Card";
import "./SomethingList.css";

export default function SomethingList() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const {
    list,
    loadingList,
    errorList,
    query: reduxQuery,
  } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(setQuery(query));
    dispatch(fetchItems(query));
  }, [query, dispatch]);

  const handleChange = (e) => dispatch(setQuery(e.target.value));

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(reduxQuery ? { q: reduxQuery } : {});
  };

  if (loadingList) return <Spinner />;
  if (errorList) return <ErrorBox message={errorList} />;

  return (
    <section className="something-list-section">
      <h1>Characters</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search characters..."
          value={reduxQuery}
          onChange={handleChange}
          className="something-list-input"
        />
        <button type="submit" className="something-list-button">
          Search
        </button>
      </form>

      <div className="something-list-cards">
        {list.length > 0 ? (
          list.map((item) => <Card key={item.id} item={item} />)
        ) : (
          <p>No characters found</p>
        )}
      </div>
    </section>
  );
}
