import NavBar from "../components/NavBar";

export default function RootLayout({ children }) {
  return (
    <div>
      <NavBar />
      <main style={{ padding: "20px" }}>
        {children}
      </main>
    </div>
  );
}
