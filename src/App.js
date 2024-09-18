import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Pages/Home';
import Contato from './components/Pages/Contato';
import NewProjet from './components/Pages/NewProjet';
import Company from './components/Pages/Company';
import Container from './layout/Container';

function App() {
  return (
    <Router>
      <div>
          <Link to="/">Home</Link>
          <Link to="/contato">Contato</Link>
          <Link to="/Company">Empresa</Link>
          <Link to="/NewProjet">Novo Projeto</Link>
      </div>
      <Container customClass='min_height'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Company' element={<Company />} />
          <Route path='/contato' element={<Contato />} />
          <Route path='/NewProjet' element={<NewProjet />} />
        </Routes>
      </Container>
      <p>Footer</p>
    </Router>
  );
}

export default App;
