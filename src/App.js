import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
import Contato from './components/Pages/Contato';
import NewProjet from './components/Pages/NewProjet';
import Company from './components/Pages/Company';
import Container from './components/layout/Container';

import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Projects from './components/Pages/Projects';

function App() {
  return (
    <Router>
      <NavBar/>
      <Container customClass='min_height'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Company' element={<Company />} />
          <Route path='/Projects' element={<Projects />} />
          <Route path='/contato' element={<Contato />} />
          <Route path='/NewProjet' element={<NewProjet />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
