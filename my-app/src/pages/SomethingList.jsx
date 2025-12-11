import { useEffect } from "react";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import usePaginatedItems from "../hooks/usePaginatedItems";
import "./SomethingList.css";

export default function SomethingList() {
  const {
    items,
    query,
    page,
    loadingList,
    errorList,
    totalPages,
    setQuery,
    setPage,
    load,
  } = usePaginatedItems();

  // fetch whenever debounced query or page changes
  useEffect(() => {
    load();
  }, [load]);

  return (
    <section className="something-list-section">
      <h1>Characters</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="something-list-input"
      />

      {/* Items */}
      {loadingList && <Spinner />}
      {errorList && <ErrorBox message={errorList} />}

      <div className="something-list-cards">
        {items.map(item => (
          <Card key={item.id} item={item} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>{page} / {totalPages}</span>

        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </section>
  );
}
