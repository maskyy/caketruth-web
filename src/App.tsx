import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import DiaryPage from "./pages/DiaryPage";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return <div>
    <h1>header 1</h1>
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/diary">diary</Link></li>
          <li><Link to="/products">products</Link></li>
          <li><Link to="/profile">profile</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<div>hello world</div>} />
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </div>;
}

export default App;
