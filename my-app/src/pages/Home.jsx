export default function Home() {
  return (
    <section style={{ textAlign: "center" }}>
      <h1>Welcome to the Rick & Morty Explorer</h1>
      <p>Browse characters from the Rick and Morty universe</p>
      <img
        src="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
        alt="Rick"
        style={{ borderRadius: "10px", marginTop: "20px" }}
      />
    </section>
  );
}
