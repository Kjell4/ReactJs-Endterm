const BASE_URL = "https://rickandmortyapi.com/api/character";

export async function getAll({ name = "", page = 1 }) {
  const url = `${BASE_URL}/?page=${page}${name ? `&name=${name}` : ""}`;
  const res = await fetch(url);

  if (!res.ok) {
    // API возвращает 404, если персонажей нет
    return { results: [], totalPages: 1 };
  }

  const data = await res.json();
  return {
    results: data.results,
    totalPages: data.info.pages,
  };
}

export async function getById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Character not found");
  return res.json();
}
