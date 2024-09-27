import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
import NewProjet from './components/Pages/NewProjet';
import Container from './components/layout/Container';

import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Projects from './components/Pages/Projects';
import Project from './components/Pages/Project';

function App() {
  return (
    <Router>
      <NavBar/>
      <Container customClass='min_height'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/Projects' element={<Projects />} />
          <Route path='/NewProjet' element={<NewProjet />} />
          <Route path='/project/:id' element={<Project />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
