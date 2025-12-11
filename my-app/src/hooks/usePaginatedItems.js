import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, setPage, setQuery } from "../features/items/itemsSlice";
import useDebouncedValue from "./useDebouncedValue";

export default function usePaginatedItems() {
  const dispatch = useDispatch();

  const { list, query, page, loadingList, errorList, totalPages } =
    useSelector((state) => state.items);

  const debouncedQuery = useDebouncedValue(query, 500);

  // fetch items
  const load = useCallback(() => {
    dispatch(fetchItems({ query: debouncedQuery, page }));
  }, [dispatch, debouncedQuery, page]);

  // memoized list
  const items = useMemo(() => list, [list]);

  return {
    items,
    query,
    page,
    loadingList,
    errorList,
    totalPages,

    setQuery: (q) => dispatch(setQuery(q)),
    setPage: (p) => dispatch(setPage(p)),
    load,
  };
}
