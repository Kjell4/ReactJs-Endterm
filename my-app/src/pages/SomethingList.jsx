import { useEffect, useState } from "react";
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
  const [localQuery, setLocalQuery] = useState(searchParams.get("q") || "");

  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 5;

  const { list = [], loadingList, errorList, totalPages } = useSelector(state => state.items);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localQuery !== query) {
        setSearchParams({ q: localQuery, page: 1 }); 
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [localQuery]);

  useEffect(() => {
    dispatch(fetchItems({ query, page, limit }));
  }, [query, page, limit, dispatch]);

  if (loadingList) return <Spinner />;
  if (errorList) return <ErrorBox message={errorList} />;

  return (
    <section className="something-list-section">
      <h1>Characters</h1>

      <form
        onSubmit={e => {
          e.preventDefault();
          setSearchParams({ q: localQuery, page: 1 });
        }}
      >
        <input
          type="text"
          placeholder="Search characters..."
          value={localQuery}
          onChange={e => setLocalQuery(e.target.value)}
          className="something-list-input"
        />
        <button type="submit" className="something-list-button">Search</button>
      </form>

      <div className="something-list-cards">
        {list.length > 0 ? list.map(item => <Card key={item.id} item={item} />)
          : <p>No characters found</p>
        }
      </div>

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setSearchParams({ q: query, page: page - 1 })}>
          Prev
        </button>
        <span>Page {page}</span>
        <button disabled={page >= totalPages} onClick={() => setSearchParams({ q: query, page: page + 1 })}>
          Next
        </button>
      </div>
    </section>
  );
}

