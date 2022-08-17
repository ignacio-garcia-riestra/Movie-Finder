import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Results from "./components/Results";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<Navigate to="404" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;