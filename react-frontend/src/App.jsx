import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Accueil from "./pages/accueil"
import Parking from "./pages/parking"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/parking" element={<Parking />} />
      </Routes>
    </Router>
  );
}

export default App;
