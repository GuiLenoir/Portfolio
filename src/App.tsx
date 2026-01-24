import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Repositorio } from './pages/Repositorio';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <Router basename="/Portfolio/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repositorio/:repoName" element={<Repositorio />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
