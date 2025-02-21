import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./layout/header"
import Time from "./components/time"
import Accueil from "./pages/accueil"
import Parking from "./pages/parking"
import Test from "./pages/velov"

function App() {
  return (
    <Router>
      <div className="container">
        <Header /> {/* Renders globally at the top */}
        <div className="main-layout">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/accueil" element={<Accueil />} />
              <Route path="/parking" element={<Parking />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </main>
        </div>
      </div>
      <Time/>
    </Router>
  );
}

export default App;