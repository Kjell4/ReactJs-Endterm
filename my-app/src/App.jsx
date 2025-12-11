import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import SomethingList from "./pages/SomethingList";
import SomethingDetails from "./pages/SomethingDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { AuthProvider } from "./AuthContext";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RootLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<SomethingList />} />
            <Route path="/items/:id" element={<SomethingDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </RootLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}
