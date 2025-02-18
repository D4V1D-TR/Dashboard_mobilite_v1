import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./layout/header"
import Accueil from "./pages/accueil"
import Parking from "./pages/parking"
import Test from "./pages/test"

function App() {
  return (
    <Router>
      <div className="container">
        <Header /> {/* Renders globally at the top */}
        <div className="main-layout">
          <nav className="nav"> {/* Optional navigation bar */}
            <ul>
              <li><a href="/accueil">Accueil</a></li>
              <li><a href="/parking">Parking</a></li>
              <li><a href="/test">Test</a></li>
            </ul>
          </nav>
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
    </Router>
  );
}

export default App;