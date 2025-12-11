export default function ErrorBox({ message }) {
  return (
    <div style={{ color: "red", padding: "10px", background: "#fee" }}>
      ⚠️ {message}
    </div>
  );
}
