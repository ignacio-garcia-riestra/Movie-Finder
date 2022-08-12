import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
//import Search from "./components/Search";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/search" element={<Search />} /> */}
          <Route path="*" element={<Navigate to="404" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;