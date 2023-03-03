import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import DiaryPage from "./pages/DiaryPage";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import ReportsPage from "./pages/ReportsPage";

function App() {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>hello world</div>} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </div>;
}

export default App;
