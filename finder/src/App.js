import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
//import Login from "./components/Login"
//import Search from "./components/Search";
//import NotFound from "./components/NotFound";


function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Rutas de Navbar */}
          
          
          
          {/* <Route path="/search" element={<Search />} /> */}
          <Route path="/register" element={<Register />} />
          {/* <Route path="/login" element={<Login />} /> */}

          {/* 404 */}
          {/* <Route path="/404" element={<NotFound />} /> */}
          <Route path="*" element={<Navigate to="404" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;