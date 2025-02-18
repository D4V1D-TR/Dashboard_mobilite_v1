import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./layout/header"
import Accueil from "./pages/accueil"
import Parking from "./pages/parking"
import Test from "./pages/test"

function App() {
  return (
    <Router>
      <Header /> {/* Rendre le Header globalement ici */}
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/parking" element={<Parking />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
